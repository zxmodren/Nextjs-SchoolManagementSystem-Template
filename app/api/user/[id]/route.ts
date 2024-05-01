import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(3, { message: "Name Min 3 Character" }),
  role: z.enum(
    [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.UNKNOW],
    {
      errorMap: () => ({ message: "Select Role" }),
    }
  ),
  status: z.enum(
    [
      UserStatus.ACTIVE,
      UserStatus.IN_ACTIVE,
      UserStatus.BANNED,
      UserStatus.UNKNOW,
    ],
    {
      errorMap: () => ({ message: "Select Status" }),
    }
  ),
});
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: User = await request.json();
    const validatedData = UserSchema.parse(body);

    if (body.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });
      if (existingUser && existingUser.id !== params.id) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.update({
      where: {
        id: String(params.id),
      },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role as UserRole,
        status: validatedData.status as UserStatus,
        teacher: {
          updateMany: {
            where: {
              userId: String(params.id), // Specify the teacher to update based on user ID
            },
            data: {
              name: body.name, // Update the teacher's name
            },
          },
        },
        student: {
          updateMany: {
            where: {
              userId: String(params.id), // Specify the teacher to update based on user ID
            },
            data: {
              name: body.name, // Update the teacher's name
            },
          },
        },
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (body.role === UserRole.TEACHER) {
      const teacher = await prisma.teachers.create({
        data: {
          name: body.name,
          userId: user.id,
        },
      });

      // Delete student record if role changed from STUDENT to TEACHER
      const deleteStudent = await prisma.students.deleteMany({
        where: {
          userId: user.id,
        },
      });
    } else if (body.role === UserRole.STUDENT) {
      const student = await prisma.students.create({
        data: {
          name: body.name,
          userId: user.id,
        },
      });

      // Delete teacher record if role changed from TEACHER to STUDENT
      const deleteTeacher = await prisma.teachers.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 505 }
      );
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await prisma.user.delete({
    where: {
      id: String(params.id),
    },
  });

  await prisma.$disconnect();
  return NextResponse.json(user, { status: 200 });
};
