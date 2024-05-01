import React from "react";
import { Tablehd } from "@/types/table";

const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
  },
  {
    name: "Classroom",
  },
  {
    name: "Teacher",
  },
  {
    name: "Day",
  },
  {
    name: "Time",
  },
  {
    name: "Actions",
  },
];
export const TbheadSchedule = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataSchedule.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Lesson"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Classroom"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Teacher"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Day"
                        ? "min-w-[150px] px-4 py-4"
                        : tablehdItem.name === "Time"
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
