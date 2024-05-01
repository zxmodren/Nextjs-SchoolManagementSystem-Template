import { db } from "@/lib/db";

import { auth } from "@/auth";

export const getSchedulebyTeacherId = async () => {
  const session = await auth();
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId: session?.user.id,
      },
      include: {
        lesson: {
          include: {
            schedule: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getAssignmentbyTeacherId = async () => {
  const session = await auth();
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId: session?.user.id,
      },
      include: {
        lesson: {
          include: {
            assingment: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getLessonbyTeacherId = async () => {
  "use server";
  const session = await auth();
  try {
    const res = await db.lessons.findMany({
      where: {
        teacherId: session?.user.id,
      },
      select: {
        id: true,
        teacherId: true,
        name: true,
        cat: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      data: res,
    };
  } finally {
    await db.$disconnect();
  }
};
