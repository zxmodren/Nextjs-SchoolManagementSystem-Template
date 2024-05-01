import React from "react";
import { Tablehd } from "@/types/table";

const tablehdDataUser: Tablehd[] = [
  {
    name: "Name",
  },
  {
    name: "Email",
  },
  {
    name: "Role",
  },
  {
    name: "Status",
  },
  {
    name: "Actions",
  },
];
export const Tbheaduser = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataUser.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Name"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Email"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Phone"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Role"
                        ? " min-w-[120px] px-4 py-4"
                        : tablehdItem.name === "Status"
                          ? " min-w-[120px] px-4 py-4"
                          : tablehdItem.name === "Actions"
                            ? "px-20 py-4"
                            : ""
              }`}
            >
              {tablehdItem.name}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
