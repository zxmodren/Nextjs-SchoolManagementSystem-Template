import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { ScheduleResult } from "@/lib/teacher";
const TbodyScheduleTeacher = async () => {
  const result = await getSchedulebyTeacherId();
  const teachersData = ScheduleResult(result);
  return (
    <>
      <tbody>
        {teachersData.map((teacher) =>
          teacher.lesson.map((lesson) => (
            <tr key={`${teacher.id}-${lesson.name}`}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <ul className="font-medium text-black dark:text-white py-5">
                  {lesson.name}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {lesson.schedule.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                    {lesson.schedule.map((schedule) => (
                      <li
                        key={schedule.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {schedule.classroom.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {lesson.schedule.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                    {lesson.schedule.map((schedule) => (
                      <li
                        key={schedule.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {schedule.day}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {lesson.schedule.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                    {lesson.schedule.map((schedule) => (
                      <li
                        key={schedule.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {schedule.time}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default TbodyScheduleTeacher;
