import React from "react";
import { TbheadClassroom } from "@/components/TbClassroom/head";
import TbodyClassroom from "@/components/TbClassroom/body";
import Ad from "@/components/TbClassroom/btn/ad";
import { PageProps } from "@/types/pagination";
const ClassroomList = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Ad />
          <table className="w-full table-auto">
            <TbheadClassroom />
            <TbodyClassroom {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassroomList;
