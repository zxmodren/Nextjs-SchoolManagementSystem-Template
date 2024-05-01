import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Schedule } from "@prisma/client";
import { z } from "zod";

const ScheduleSchema = z.object({
  classId: z.string().min(4, { message: "Select Classroom" }),
  lessonId: z.string().min(3, { message: "Lesson Name Min 3 Character" }),
  day: z.string().date(),
});
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Schedule = await request.json();
    const validatedData = ScheduleSchema.parse(body);
    const EditSchedule = await prisma.schedule.update({
      where: {
        id: String(params.id),
      },
      data: {
        day: new Date(validatedData.day),
        time: body.time,
        lessonId: validatedData.lessonId,
        classId: validatedData.classId,
      },
    });
    return NextResponse.json(EditSchedule, { status: 201 });
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
  const lesson = await prisma.schedule.delete({
    where: {
      id: String(params.id),
    },
  });

  await prisma.$disconnect();
  return NextResponse.json(lesson, { status: 200 });
};
