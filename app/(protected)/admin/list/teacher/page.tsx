import React from "react";
import TbodyTeacher from "@/components/TbTeacher/body";
import { Tbheadteacher } from "@/components/TbTeacher/head";
import { PageProps } from "@/types/pagination";
const TeacherList = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <Tbheadteacher />
            <TbodyTeacher {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
