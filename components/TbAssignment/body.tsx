import React from "react";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import Link from "next/link";
import Pagination from "../pagination/pagination";
import { PageProps } from "@/types/pagination";
import { fetchAssignment } from "@/data/assignments";

export type FetcAssignmentType = typeof fetchAssignment;
const TbodyAssignment = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchAssignment({ take, skip });
  const [lessons] = await Promise.all([getAllLessons()]);
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  return (
    <>
      <tbody>
        {data.map((assignment) => (
          <tr key={assignment.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {assignment.lesson.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <h5 className="text-sm  text-black dark:text-white">
                {assignment.task}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {assignment.teacher.name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {assignment.classroom.name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              {assignment.fileUrl ? (
                <Link href={assignment.fileUrl} passHref>
                  <button className="btnDownload" type="button">
                    Click Here
                  </button>
                </Link>
              ) : (
                <span>File URL is null</span>
              )}
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {assignment.deadline.toLocaleDateString()}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {assignment.time}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Del assignment={assignment} />
                <Edt
                  lessons={lessons}
                  classrooms={classrooms}
                  assignment={assignment}
                />
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

export default TbodyAssignment;
