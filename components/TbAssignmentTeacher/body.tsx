import React from "react";
import Link from "next/link";
import { getAssignmentbyTeacherId, getLessonbyTeacherId } from "@/data/teacher";
import { getAllClassrooms } from "@/data/academy";
import { AssignmentResult } from "@/lib/teacher";
import Edt from "./btn/edt";
import Del from "./btn/del";
const TbodyAssignment = async () => {
  const result = await getAssignmentbyTeacherId();
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const { data } = await getLessonbyTeacherId();
  const AssigmnetData = AssignmentResult(result);

  return (
    <>
      <tbody>
        {AssigmnetData.map((assingmentItem) =>
          assingmentItem.lesson.map((lesson) => (
            <tr key={`${lesson.id}-${lesson.name}`}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <ul className="font-medium text-black dark:text-white py-5">
                  {lesson.name}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1.5"
                    >
                      {assignment.task}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1.5"
                    >
                      {assignment.classroom.name}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1"
                    >
                      <button className="btnDownload" type="button">
                        <Link href={assignment.fileUrl}>Click Here</Link>
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1.5"
                    >
                      {assignment.deadline}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1.5"
                    >
                      {assignment.time}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <ul className="text-sm text-black dark:text-white py-5">
                  {lesson.assingment.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="text-sm text-black dark:text-white py-1"
                    >
                      <div className="flex items-center space-x-3.5">
                        <Edt
                          lessons={data}
                          classrooms={classrooms}
                          assignment={assignment}
                        />
                        <Del assignment={assignment} />
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default TbodyAssignment;
