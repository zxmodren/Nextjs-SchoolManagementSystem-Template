import React from "react";
import { Tbheaduser } from "@/components/TbUser/head";
import TbodyUser from "@/components/TbUser/body";
import Ad from "@/components/TbUser/btn/ad";
import { PageProps } from "@/types/pagination";
const UserList = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Ad />
          <table className="w-full table-auto">
            <Tbheaduser />
            <TbodyUser {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
