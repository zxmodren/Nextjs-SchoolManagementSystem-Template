import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
const AssingmentSchema = z.object({
  createBy: z.string().min(4, { message: "Select Teacher" }),
  task: z.string().min(4, { message: "Task Name Min 4 Character" }),
  classroom: z.string().min(4, { message: "Select Classroom" }),
  lesson: z.string().min(4, { message: "Select Lesson" }),
  deadline: z.string().date(),
});
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  let body;
  try {
    body = await request.json();
    const validatedData = AssingmentSchema.parse(body);

    const newAssignment = await prisma.assignments.create({
      data: {
        createBy: validatedData.createBy,
        classId: validatedData.classroom,
        lessonId: validatedData.lesson,
        deadline: new Date(validatedData.deadline),
        time: body.time,
        task: validatedData.task,
        fileUrl: body.file,
      },
    });
    return NextResponse.json(newAssignment, { status: 201 });
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
