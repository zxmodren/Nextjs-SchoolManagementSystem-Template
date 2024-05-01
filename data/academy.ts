import { db } from "@/lib/db";

export const getAllClassrooms = async () => {
  try {
    const res = await db.classrooms.findMany({
      select: {
        id: true,
        name: true,
        cap: true,
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};

export const getAllTeachers = async () => {
  try {
    const res = await db.teachers.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        user: {
          select: {
            email: true,
            gender: true,
            status: true,
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};

export const getAllStudents = async () => {
  try {
    const res = await db.students.findMany({
      relationLoadStrategy: "join",
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
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};

export const getAllLessons = async () => {
  try {
    const res = await db.lessons.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        name: true,
        teacherId: true,
        cat: true,
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getAllSchedules = async () => {
  try {
    const res = await db.schedule.findMany({
      relationLoadStrategy: "join",
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
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getAllAssignmets = async () => {
  try {
    const res = await db.assignments.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        deadline: true,
        time: true,
        task: true,
        lessonId: true,
        classId: true,
        fileUrl: true,
        lesson: {
          select: {
            name: true,
          },
        },
        classroom: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
