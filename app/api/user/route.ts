import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(3, { message: "Name Min 3 Character" }),
  password: z.string().min(6, { message: "Password Min 6 Character" }),
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

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = UserSchema.parse(body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10); // Menghash password menggunakan bcrypt
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role as UserRole,
        status: validatedData.status as UserStatus,
        password: hashedPassword, // Menggunakan password yang telah dihash
      },
    });

    if (newUser.role === UserRole.TEACHER) {
      const newTeacher = await prisma.teachers.create({
        data: {
          name: body.name, // Atau data lain yang sesuai dengan model Teacher
          userId: newUser.id, // Menggunakan ID user baru sebagai foreign key
        },
      });
    }
    if (newUser.role === UserRole.STUDENT) {
      const newStudent = await prisma.students.create({
        data: {
          name: body.name, // Atau data lain yang sesuai dengan model Teacher
          userId: newUser.id, // Menggunakan ID user baru sebagai foreign key
        },
      });
    }
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
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
