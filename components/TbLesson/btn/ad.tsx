"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory, Teachers } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
const Ad = ({ teachers }: { teachers: Teachers[] }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [teacher, setTeacher] = useState("");
  const router = useRouter();
  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/lesson`, {
        name: name,
        cat: cat,
        teacher: teacher,
      });
      toast({
        title: "Lesson Add successfully",
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
    setName("");
    setCat("");
    setTeacher("");
    router.refresh();
    setShowModal(false);
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
                    Add Lesson
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Lesson Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Lesson Name"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="cat"
                      className="block font-medium text-gray-700 text-black dark:text-white"
                    >
                      Lesson Category:
                    </label>
                    <select
                      name="cat"
                      id="cat"
                      className="border border-gray-300 rounded-md p-2 w-full text-black"
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
                      <option value={LessonCategory.SPORT}>Sport</option>
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
                      value={teacher}
                      onChange={(e) => {
                        console.log("Selected teacher ID:", e.target.value);
                        setTeacher(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select Teacher
                      </option>
                      {teachers.map((teacher) => (
                        <option value={teacher.userId} key={teacher.userId}>
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
