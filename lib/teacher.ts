import { DataSchedule } from "@/types/schedule";
import { DataAssignment } from "@/types/assignment";

export const ScheduleResult = (result: any): DataSchedule[] => {
  let data: DataSchedule[] = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (result) {
    data = [
      {
        id: result.id,
        name: result.name ?? "",
        lesson: result.lesson.map((lesson: any) => ({
          name: lesson.name,
          cat: lesson.cat,
          schedule: lesson.schedule.map((schedule: any) => ({
            classroom: {
              name: schedule.classroom.name,
            },
            day: new Date(schedule.day).toLocaleDateString(),
            time: schedule.time,
            id: schedule.id,
          })),
        })),
      },
    ];
  }

  return data;
};
export const AssignmentResult = (result: any): DataAssignment[] => {
  let data: DataAssignment[] = [];

  if (Array.isArray(result)) {
    data = result;
  } else if (result) {
    data = [
      {
        id: result.id,
        name: result.name ?? "",
        lesson: result.lesson.map((lesson: any) => ({
          name: lesson.name,
          id: lesson.id,
          assingment: lesson.assingment.map((assingment: any) => ({
            classroom: {
              name: assingment.classroom.name,
            },
            deadline: new Date(assingment.deadline).toLocaleDateString(),
            time: assingment.time,
            task: assingment.task,
            fileUrl: assingment.fileUrl,
            id: assingment.id,
            lessonId: assingment.lessonId,
            classId: assingment.classId,
            createBy: assingment.createBy,
          })),
        })),
      },
    ];
  }

  return data;
};
