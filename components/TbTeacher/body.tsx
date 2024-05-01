import React from "react";
import { fetchTeachers } from "@/data/teachers";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
export type FetcLessonsType = typeof fetchTeachers;
const TbodyTeacher = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchTeachers({ take, skip });
  return (
    <>
      <tbody>
        {data.map((teacher) => (
          <tr key={teacher.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {teacher.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {teacher.user.email}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {teacher.user.gender}
              </p>
            </td>
            <td
              className={`border-b border-[#eee] px-4 py-5 dark:border-strokedark 
              ${
                teacher.user.status === "ACTIVE"
                  ? "text-green-500 dark:text-green-300"
                  : teacher.user.status === "IN_ACTIVE"
                    ? "text-yellow-500 dark:text-yellow-300"
                    : teacher.user.status === "BANNED"
                      ? "text-red dark:text-red"
                      : "text-black dark:text-white"
              }`}
            >
              <p className="text-sm ">
                {teacher.user.status.replace(/_/g, " ")}
              </p>
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

export default TbodyTeacher;
