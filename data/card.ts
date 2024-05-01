import { db } from "@/lib/db";

export const getTotals = async () => {
  const totalClassrooms = await db.classrooms.count();
  const totalUsers = await db.user.count();
  const totalLessons = await db.lessons.count();
  const totalAssignments = await db.assignments.count();

  return {
    totalClassrooms,
    totalUsers,
    totalLessons,
    totalAssignments
  };
};
