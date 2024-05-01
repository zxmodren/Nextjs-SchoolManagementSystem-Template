import React from "react";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import { fetchSchedules } from "@/data/schedules";
export type FetcStudentsType = typeof fetchSchedules;
const TbodySchedule = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchSchedules({ take, skip });
  const [lessons] = await Promise.all([getAllLessons()]);
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  return (
    <>
      <tbody>
        {data.map((schedule) => (
          <tr key={schedule.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {schedule.lesson.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {schedule.classroom.name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {schedule.lesson.teacher.name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {schedule.day.toLocaleDateString()}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {schedule.time}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Del schedule={schedule} />
                <Edt
                  lessons={lessons}
                  classrooms={classrooms}
                  schedule={schedule}
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

export default TbodySchedule;
