import React from "react";
import { TbheadAssignment } from "@/components/TbAssignmentTeacher/head";
import TbodyAssignment from "@/components/TbAssignmentTeacher/body";
import Ad from "@/components/TbAssignmentTeacher/btn/ad";
import { getAllClassrooms } from "@/data/academy";
import { getLessonbyTeacherId } from "@/data/teacher";
const UserList = async () => {
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const { data } = await getLessonbyTeacherId();
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Ad lessons={data} classrooms={classrooms} />
          <table className="w-full table-auto">
            <TbheadAssignment />
            <TbodyAssignment />
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
