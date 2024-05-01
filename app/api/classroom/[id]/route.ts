import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Classrooms } from "@prisma/client";
import { z } from "zod";

const ClassroomSchema = z.object({
  name: z.string().min(4, { message: "Classroom Name Min 4 Character" }),
  cap: z.string().min(2, { message: "Capacity More Than 10" }),
});

const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Classrooms = await request.json();
    const validatedData = ClassroomSchema.parse(body);
    const Editclassroom = await prisma.classrooms.update({
      where: {
        id: String(params.id),
      },
      data: {
        name: validatedData.name,
        cap: validatedData.cap as unknown as string,
      },
    });
    return NextResponse.json(Editclassroom, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
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
  const classroom = await prisma.classrooms.delete({
    where: {
      id: String(params.id),
    },
  });

  await prisma.$disconnect();
  return NextResponse.json(classroom, { status: 200 });
};
