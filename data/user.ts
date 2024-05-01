import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await db.user.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        status: true,
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};