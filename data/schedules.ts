import { db } from "@/lib/db";

export const fetchSchedules = async ({ take = 5, skip = 0 }) => {
  "use server";
  try {
    const results = await db.schedule.findMany({
      relationLoadStrategy: "join",
      skip,
      take,
      select: {
        id: true,
        day: true,
        time: true,
        lessonId: true,
        classId: true,
        lesson: {
          select: {
            name: true,
            teacher: {
              select: {
                name: true,
              },
            },
          },
        },
        classroom: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        day: "asc",
      },
    });

    const total = await db.schedule.count();

    return {
      data: results,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
    };
  } finally {
    await db.$disconnect();
  }
};
