"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

type Assignment = {
  id: string;
  lessonId: string;
  classId: string;
  deadline: string;
  time: string;
  task: string;
  createBy: string;
};

interface EdtProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
  assignment: Assignment;
}

const Edt = ({ assignment, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date(assignment.deadline).toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(assignment.time || "");
  const [lessonId, setLesson] = useState(assignment.lessonId || "");
  const [classId, setClass] = useState(assignment.classId || "");
  const [task, setTask] = useState(assignment.task || "");
  const [teacherId, setTeacherId] = useState(assignment.createBy || "");

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (
        deadline ===
          new Date(assignment.deadline).toISOString().split("T")[0] &&
        time === assignment.time &&
        classId === assignment.classId &&
        task === assignment.task &&
        lessonId === assignment.lessonId &&
        teacherId === assignment.createBy
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/assignment/${assignment.id}`, {
        deadline: deadline,
        time: time,
        lessonId: lessonId,
        classId: classId,
        task: task,
        createBy: teacherId,
      });
      toast({
        title: "Assignment Add successfully",
        description: `Assignment : ${response.data.task}`,
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
        className="btnEdtAssignment"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-10 left-10 bottom-25 xsm:left-4 xsm:right-7 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold  text-black dark:text-white">
                    Update assignment ?
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="task"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Task:
                    </label>
                    <input
                      id="task"
                      type="teks"
                      placeholder="Name of task"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
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
                      onChange={(e) => {
                        const selectedLesson = lessons.find(
                          (l) => l.id === e.target.value
                        );
                        if (selectedLesson) {
                          setLesson(selectedLesson.id);
                          setTeacherId(selectedLesson.teacherId);
                        }
                      }}
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
                      Deadline:
                    </label>
                    <input
                      id="day"
                      type="date"
                      placeholder="Day For Schedule"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
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
