import React from "react";
import { TbheadLesson } from "@/components/TbLesson/head";
import TbodyLesson from "@/components/TbLesson/body";
import Ad from "@/components/TbLesson/btn/ad";
import { getAllTeachers } from "@/data/academy";
import { PageProps } from "@/types/pagination";
const UserList = async (props: PageProps) => {
  const [teachers] = await Promise.all([getAllTeachers()]);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Ad teachers={teachers} />
          <table className="w-full table-auto">
            <TbheadLesson />
            <TbodyLesson {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
