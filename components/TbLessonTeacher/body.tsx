import React from "react";
import { PageProps } from "@/types/pagination";
import { getLessonbyTeacherId } from "@/data/teacher";
export type FetcLessonsType = typeof getLessonbyTeacherId;
const TbodyLessonTeacher = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const { data } = await getLessonbyTeacherId();
  return (
    <>
      <tbody>
        {data.map((lesson) => (
          <tr key={lesson.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {lesson.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {lesson.cat}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-5" colSpan={7}>
            <div className="flex items-center space-x-3.5">
              <div>
                <select
                  name="lesson"
                  id="lesson"
                  className="border border-gray-300 rounded-md p-2 w-full text-black"
                  // value={lesson}
                  // onChange={(e) => setLesson(e.target.value)}
                >
                  <option value="" hidden>
                    Select Lesson
                  </option>
                  {data.map((lesson) => (
                    <option value={lesson.id} key={lesson.id}>
                      {lesson.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TbodyLessonTeacher;
