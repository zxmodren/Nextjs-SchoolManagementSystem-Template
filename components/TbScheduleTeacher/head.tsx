import React from "react";
import { Tablehd } from "@/types/table";

const tablehdDataLesson: Tablehd[] = [
  {
    name: "Lesson",
  },
  {
    name: "Classroom",
  },
  {
    name: "Date",
  },
  {
    name: "Time",
  },
];
export const TbheadLesson = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataLesson.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Lesson"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Classroom"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Date"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Time"
                        ? "min-w-[150px] px-4 py-4"
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
