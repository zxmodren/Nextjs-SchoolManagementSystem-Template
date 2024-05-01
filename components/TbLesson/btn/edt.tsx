"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory } from "@prisma/client";
import { Teachers } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
type Lesson = {
  id: string;
  cat: LessonCategory;
  name: string;
  teacherId: string;
};
interface EdtProps {
  lesson: Lesson;
  teachers: Teachers[];
}
const Edt = ({ lesson, teachers }: EdtProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(lesson.name || "");
  const [cat, setCat] = useState<LessonCategory>(lesson.cat);
  const [teacherId, setTeacher] = useState(lesson.teacherId || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        name === lesson.name &&
        cat === lesson.cat &&
        teacherId === lesson.teacherId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/lesson/${lesson.id}`, {
        name: name,
        cat: cat,
        teacherId: teacherId,
      });
      toast({
        title: "Lesson Edit successfully",
        description: `Lesson : ${response.data.name}`,
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-25 right-10 left-10 bottom-25 xsm:left-4 xsm:right-7 lg:left-80 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold  text-black dark:text-white">
                    Update Lesson: {lesson.name}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Lesson Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Classroom Name"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="cat"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Category:
                    </label>
                    <select
                      name="cat"
                      id="cat"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black"
                      value={cat}
                      onChange={(e) => setCat(e.target.value as LessonCategory)}
                    >
                      <option value="" disabled>
                        Select Category of Lesson
                      </option>
                      <option value={LessonCategory.ART}>Art</option>
                      <option value={LessonCategory.LANGUANGES}>
                        Languanges
                      </option>
                      <option value={LessonCategory.SCIENCE}>Science</option>
                    </select>
                    <label
                      htmlFor="Teacher"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Teacher:
                    </label>
                    <select
                      name="teacher"
                      id="teacher"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={teacherId}
                      onChange={(e) => {
                        console.log("Selected teacher ID:", e.target.value);
                        setTeacher(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Teacher
                      </option>
                      {teachers.map((teacher) => (
                        <option value={teacher.id} key={teacher.userId}>
                          {teacher.name}
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
