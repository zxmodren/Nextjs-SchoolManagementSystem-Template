import React from "react";
import { TbheadLessonteacher } from "@/components/TbLessonTeacher/head";
import TbodyLessonTeacher from "@/components/TbLessonTeacher/body";
import Ad from "@/components/TbLesson/btn/ad";
import { getAllTeachers } from "@/data/academy";
import { PageProps } from "@/types/pagination";
const scheduleList = async (props: PageProps) => {
  const [teachers] = await Promise.all([getAllTeachers()]);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {/* <Ad teachers={teachers} /> */}
          <table className="w-full table-auto">
            <TbheadLessonteacher />
            <TbodyLessonTeacher {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default scheduleList;
