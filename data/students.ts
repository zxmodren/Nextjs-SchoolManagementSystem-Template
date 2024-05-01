import { db } from "@/lib/db";

export const fetchStudents = async ({ take = 5, skip = 0 }) => {
  "use server";
  try {
    const results = await db.students.findMany({
      relationLoadStrategy: "join",
      skip,
      take,
      select: {
        id: true,
        userId: true,
        name: true,
        onClassroom: {
          include: {
            classroom: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
            status: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const total = await db.students.count();

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
