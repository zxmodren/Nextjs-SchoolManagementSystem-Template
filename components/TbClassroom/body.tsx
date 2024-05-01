import React from "react";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import { fetchClassrooms, getTotalUsersInClassroom } from "@/data/classrooms";
export type FetcStudentsType = typeof fetchClassrooms;
const TbodyClassroom = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchClassrooms({ take, skip });
  const counts = await Promise.all(
    data.map(async (classroom) => {
      const count = await getTotalUsersInClassroom({
        classroomId: classroom.id,
      });
      return count;
    })
  );
  return (
    <>
      <tbody>
        {data.map((classroom) => (
          <tr key={classroom.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {classroom.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white ml-5">
                {classroom.cap}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white ml-12">
                {counts[data.indexOf(classroom)]}
              </p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Del classroom={classroom} />
                <Edt classroom={classroom} />
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

export default TbodyClassroom;
