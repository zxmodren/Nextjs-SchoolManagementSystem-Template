import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const ScheduleSchema = z.object({
  classroom: z.string().min(4, { message: "Select Classroom" }),
  lesson: z.string().min(3, { message: "Lesson Name Min 3 Character" }),
  day: z.string().date(),
});
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = ScheduleSchema.parse(body);
    const newSchedule = await prisma.schedule.create({
      data: {
        classId: validatedData.classroom,
        lessonId: validatedData.lesson,
        day: new Date(validatedData.day),
        time: body.time,
      },
    });
    return NextResponse.json(newSchedule, { status: 201 });
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
