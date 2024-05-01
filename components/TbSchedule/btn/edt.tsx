"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

type Schedule = {
  id: string;
  lessonId: string;
  classId: string;
  day: Date;
  time: string;
};
interface EdtProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
  schedule: Schedule;
}

const Edt = ({ schedule, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState(
    schedule.day.toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(schedule.time || "");
  const [lessonId, setLesson] = useState(schedule.lessonId || "");
  const [classId, setClass] = useState(schedule.classId || "");
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        day === schedule.day.toISOString().split("T")[0] &&
        time === schedule.time &&
        classId === schedule.classId &&
        lessonId === schedule.lessonId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/schedule/${schedule.id}`, {
        day: day,
        time: time,
        lessonId: lessonId,
        classId: classId,
      });
      toast({
        description: "Schedule Edit successfully",
      });
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
        className: "bg-red text-white",
      });
    }
    setIsLoading(false);
    setShowModal(false);
    router.refresh();
  };
  return (
    <>
      <button
        className="btnEdt"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-8 left-8 bottom-25 xsm:left-4 xsm:right-7 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold  text-black dark:text-white">
                    Update Schedule ?
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="lesson"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Lesson:
                    </label>
                    <select
                      name="lesson"
                      id="lesson"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={lessonId}
                      onChange={(e) => setLesson(e.target.value)}
                    >
                      <option value="" hidden>
                        Select Lesson
                      </option>
                      {lessons.map((lesson) => (
                        <option value={lesson.id} key={lesson.id}>
                          {lesson.name}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="day"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Day:
                    </label>
                    <input
                      id="day"
                      type="date"
                      placeholder="Day For Schedule"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    />
                    <label
                      htmlFor="time"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Time:
                    </label>
                    <input
                      id="time"
                      type="time"
                      placeholder="Day For Schedule"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <label
                      htmlFor="classroom"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Classroom:
                    </label>
                    <select
                      name="classroom"
                      id="classroom"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={classId}
                      onChange={(e) => setClass(e.target.value)}
                    >
                      <option value="" hidden>
                        Select Classroom
                      </option>
                      {classrooms.map((classroom) => (
                        <option value={classroom.id} key={classroom.id}>
                          {classroom.name}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btnClose"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btnSave"
                    type="button"
                    onClick={handleUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Edt;
