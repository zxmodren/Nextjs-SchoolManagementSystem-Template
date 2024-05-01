"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}
const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const handleAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/schedule`, {
        day: day,
        time: time,
        lesson: lesson,
        classroom: classroom,
      });
      toast({
        description: "Schedule Add successfully",
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
    setDay("");
    setTime("");
    setLesson("");
    setClassroom("");
    router.refresh();
  };
  return (
    <>
      <button
        className="btnAdd"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-10 left-10 bottom-25 xsm:left-4 xsm:right-4 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:border-strokedark dark:bg-boxdark outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black dark:text-white">
                    Add Schedule
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
                      value={lesson}
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
                      htmlFor="classroom"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Classroom:
                    </label>
                    <select
                      name="classroom"
                      id="classroom"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={classroom}
                      onChange={(e) => setClassroom(e.target.value)}
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
                    <label
                      htmlFor="day"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Day:
                    </label>
                    <input
                      id="day"
                      type="date"
                      placeholder="Day for schedule"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    />
                    <label
                      htmlFor="time"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Time:
                    </label>
                    <input
                      name="time"
                      type="time"
                      id="time"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
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
                    onClick={handleAdd}
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

export default Ad;
