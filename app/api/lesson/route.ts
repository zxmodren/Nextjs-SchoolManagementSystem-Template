import { PrismaClient, LessonCategory } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const LessonSchema = z.object({
  teacher: z.string().min(4, { message: "Select teacher" }),
  name: z.string().min(3, { message: "Lesson Name Min 3 Character" }),
  cat: z.enum(
    [
      LessonCategory.ART,
      LessonCategory.LANGUANGES,
      LessonCategory.SCIENCE,
      LessonCategory.SPORT,
    ],
    {
      errorMap: () => ({ message: "Select Category" }),
    }
  ),
});
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = LessonSchema.parse(body);
    const newLesson = await prisma.lessons.create({
      data: {
        name: validatedData.name,
        cat: validatedData.cat as LessonCategory,
        teacherId: validatedData.teacher,
      },
    });
    return NextResponse.json(newLesson, { status: 201 });
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
