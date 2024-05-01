import React from "react";
import { Tablehd } from "@/types/table";

const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
  },
  {
    name: "Name",
  },
  {
    name: "CreateBy",
  },
  {
    name: "Classroom",
  },
  {
    name: "File",
  },
  {
    name: "Deadline",
  },
  {
    name: "Time",
  },
  {
    name: "Actions",
  },
];
export const TbheadAssignment = () => {
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
                  : tablehdItem.name === "Name"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "CreateBy"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Classroom"
                        ? "min-w-[150px] px-4 py-4"
                        : tablehdItem.name === "File"
                          ? "min-w-[150px] px-4 py-4"
                          : tablehdItem.name === "Deadline"
                            ? "min-w-[150px] px-4 py-4"
                            : tablehdItem.name === "Time"
                              ? "min-w-[150px] px-4 py-4"
                              : tablehdItem.name === "File"
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
