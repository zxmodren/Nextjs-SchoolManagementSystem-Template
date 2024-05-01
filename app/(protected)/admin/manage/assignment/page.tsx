import React from "react";

import { TbheadAssignment } from "@/components/TbAssignment/head";
import TbodyAssignment from "@/components/TbAssignment/body";
import Ad from "@/components/TbAssignment/btn/ad";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import { PageProps } from "@/types/pagination";
const AssignmentList = async (props: PageProps) => {
  const [lessons, classrooms] = await Promise.all([
    getAllLessons(),
    getAllClassrooms(),
  ]);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Ad lessons={lessons} classrooms={classrooms} />
          <table className="w-full table-auto">
            <TbheadAssignment />
            <TbodyAssignment {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentList;
