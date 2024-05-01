import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Assignments } from "@prisma/client";
import { z } from "zod";
const AssingmentSchema = z.object({
  createBy: z.string().min(4, { message: "Select Teacher" }),
  task: z.string().min(4, { message: "Task Name Min 4 Character" }),
  classId: z.string().min(4, { message: "Select Classroom" }),
  lessonId: z.string().min(4, { message: "Select Lesson" }),
  deadline: z.string().date(),
});
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Assignments = await request.json();
    const validatedData = AssingmentSchema.parse(body);
    const Editassignment = await prisma.assignments.update({
      where: {
        id: String(params.id),
      },
      data: {
        task: validatedData.task,
        deadline: new Date(validatedData.deadline),
        createBy: validatedData.createBy,
        time: body.time,
        lessonId: validatedData.lessonId,
        classId: validatedData.classId,
      },
    });
    return NextResponse.json(Editassignment, { status: 201 });
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

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const lesson = await prisma.assignments.delete({
    where: {
      id: String(params.id),
    },
  });

  await prisma.$disconnect();
  return NextResponse.json(lesson, { status: 200 });
};
