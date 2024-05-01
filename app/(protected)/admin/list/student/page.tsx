import React from "react";
import TbodyStudent from "@/components/TbStudent/body";
import { Tbheadstudent } from "@/components/TbStudent/head";
import { PageProps } from "@/types/pagination";
const UserList = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <Tbheadstudent />
            <TbodyStudent {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
