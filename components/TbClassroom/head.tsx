import React from "react";
import { Tablehd } from "@/types/table";

const tablehdDataClassroom: Tablehd[] = [
  {
    name: "Classroom",
  },
  {
    name: "Capacity",
  },
  {
    name: "Total Student",
  },
  {
    name: "Actions",
  },
];
export const TbheadClassroom = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataClassroom.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Classroom"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Capacity"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Total Student"
                      ? "min-w-[150px] px-4 py-4"
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
