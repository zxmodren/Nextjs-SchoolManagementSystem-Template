import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();

  const existingOnClassroom = await prisma.onClassroom.findFirst({
    where: {
      userId: body.studentId,
    },
  });

  if (existingOnClassroom) {
    await prisma.$disconnect();
    return NextResponse.json({ message: 'Student is already in a classroom' }, { status: 400 });
  }

  const duplicate = await prisma.onClassroom.findFirst({
    where: {
      userId: body.studentId,
      classroomId: body.classroomId,
    },
  });

  if (duplicate) {
    await prisma.$disconnect();
    return NextResponse.json({ message: 'Duplicate Data' }, { status: 400 });
  }

  try {
    const newClassroom = await prisma.onClassroom.create({
      data: {
        userId: body.studentId,
        classroomId: body.classroomId,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(newClassroom, { status: 201 });
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
