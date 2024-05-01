"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteFileOnZodError } from "@/actions/deleteFile";
import { useToast } from "@/components/ui/use-toast";
interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}
const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState<File>();
  const [task, setTask] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setFile(files[0]);
      console.log(files[0]);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File Too BIG",
      });
    }
  };

  const handleUploadAndAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (
      !file ||
      !deadline ||
      !time ||
      !lesson ||
      !teacherId ||
      !classroom ||
      !task
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all fields and select a file",
      });
      setIsLoading(false);
      return;
    }

    let downloadURL: string | null = null;
    try {
      const name = file.name;
      const storageRef = ref(storage, `file/${lesson}/${classroom}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            console.log("Upload complete");
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      // Jika upload berhasil, lanjutkan dengan mengirim data ke API
      const response = await axios.post(`/api/assignment`, {
        deadline: deadline,
        time: time,
        lesson: lesson,
        createBy: teacherId,
        classroom: classroom,
        task: task,
        file: downloadURL, // Gunakan downloadURL yang telah diperoleh dari Firebase
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
      await deleteFileOnZodError(downloadURL);
      return;
    } finally {
      setIsLoading(false);
      setShowModal(false);
      setDeadline("");
      setTime("");
      setLesson("");
      setTask("");
      setClassroom("");
      router.refresh();
    }
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
                    Add Assignment
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="task"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Name Task:
                    </label>
                    <input
                      name="task"
                      type="text"
                      id="task"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      placeholder="Name of Task"
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
                      value={lesson}
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
                      Deadline:
                    </label>
                    <input
                      id="deadline"
                      type="date"
                      placeholder="Deadline of Assignment"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
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
                    <label
                      htmlFor="file"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      File:
                    </label>
                    <input
                      name="file"
                      id="file"
                      type="file"
                      className="border border-gray-300 rounded-md bg-white p-2 w-full text-black"
                      placeholder="select file"
                      onChange={(files) =>
                        handleSelectedFile(files.target.files)
                      }
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
                    onClick={handleUploadAndAdd}
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
