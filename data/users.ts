import { db } from "@/lib/db";

export const fetchUsers = async ({
  take = 5,
  skip = 0,
  query,
}: {
  query?: string;
  take: number;
  skip: number;
}) => {
  "use server";
  try {
    const results = await db.user.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
        NOT: {
          role: "ADMIN",
        },
      },
      relationLoadStrategy: "join",
      skip,
      take,
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        status: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const total = await db.user.count();

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
