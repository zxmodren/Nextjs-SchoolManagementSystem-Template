import React from "react";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Add from "./btn/add";
import { fetchStudents } from "@/data/students";
import { getAllClassrooms } from "@/data/academy";
export type FetcStudentsType = typeof fetchStudents;
const TbodyStudent = async (props: PageProps) => {
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchStudents({ take, skip });

  return (
    <>
      <tbody>
        {data.map((student) => (
          <tr key={student.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {student.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {student.user.email}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white">
                {student.onClassroom.length > 0
                  ? student.onClassroom
                      .map((oc) => oc.classroom.name)
                      .join(", ")
                  : "No data"}
              </p>
            </td>
            <td
              className={`border-b border-[#eee] px-4 py-5 dark:border-strokedark 
              ${
                student.user.status === "ACTIVE"
                  ? "text-green-500 dark:text-green-300"
                  : student.user.status === "IN_ACTIVE"
                    ? "text-yellow-500 dark:text-yellow-300"
                    : student.user.status === "BANNED"
                      ? "text-red dark:text-red"
                      : "text-black dark:text-white"
              }`}
            >
              <p className="text-sm">
                {student.user.status.replace(/_/g, " ")}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Add classrooms={classrooms} student={student} />
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

export default TbodyStudent;
