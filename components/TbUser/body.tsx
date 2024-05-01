import React from "react";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import { fetchUsers } from "@/data/users";
export type FetcLessonsType = typeof fetchUsers;
const TbodyUser = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  const { data, metadata } = await fetchUsers({ take, skip, query: search });
  return (
    <>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {user.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm  text-black dark:text-white">
                {user.email}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white">
                {user.role &&
                  user.role.charAt(0).toUpperCase() +
                    user.role.slice(1).toLowerCase()}
              </p>
            </td>
            <td
              className={`border-b border-[#eee] px-4 py-5 dark:border-strokedark 
              ${
                user.status === "ACTIVE"
                  ? "text-green-500 dark:text-green-300"
                  : user.status === "IN_ACTIVE"
                    ? "text-yellow-500 dark:text-yellow-300"
                    : user.status === "BANNED"
                      ? "text-red dark:text-red"
                      : "text-black dark:text-white"
              }`}
            >
              <p className="text-sm">{user.status.replace(/_/g, " ")}</p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Del user={user} />
                <Edt user={user} />
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
              <Search search={search} />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TbodyUser;
