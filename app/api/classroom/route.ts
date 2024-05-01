import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const ClassroomSchema = z.object({
  name: z.string().min(4, { message: "Classroom Name Min 4 Character" }),
  cap: z.string().min(2, { message: "Capacity More Than 10" }),
});
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = ClassroomSchema.parse(body);

    const newClassroom = await prisma.classrooms.create({
      data: {
        name: validatedData.name,
        cap: validatedData.cap,
      },
    });

    return NextResponse.json(newClassroom, { status: 201 });
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
