import React from "react";
import { getAllTeachers } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import { fetchLessons } from "@/data/lessons";
import Pagination from "../pagination/pagination";
export type FetcLessonsType = typeof fetchLessons;
const TbodyLesson = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchLessons({ take, skip });
  const [teachers] = await Promise.all([getAllTeachers()]);
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
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {lesson.teacher.name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Del lesson={lesson} />
                <Edt teachers={teachers} lesson={lesson} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-5" colSpan={7}>
            <div className="flex items-center space-x-3.5">
              <Pagination {...metadata} />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TbodyLesson;
