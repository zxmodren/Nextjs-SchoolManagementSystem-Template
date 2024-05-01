"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { Classrooms } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
type Student = {
  id: string;
  userId: string;
  name: string | null;
};
interface EdtProps {
  classrooms: Classrooms[];
  student: Student;
}
const Add = ({ student, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(student.name || "");
  const [studentId, setStudent] = useState(student.userId || "");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/student`, {
        classroomId: classroom,
        studentId: studentId,
      });
      toast({
        description: "Add successfully",
      });
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold  text-black dark:text-white">
                    Update User: {student.name}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black dark:text-white"
                      value={name}
                      onChange={(e) => setStudent(e.target.value)}
                      disabled
                    />
                    <input
                      id="id"
                      type="text"
                      placeholder="id"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black dark:text-white"
                      value={studentId}
                      onChange={(e) => setName(e.target.value)}
                      hidden
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

export default Add;
