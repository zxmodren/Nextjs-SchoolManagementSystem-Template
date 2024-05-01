"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  name: string | null;
};

const Edt = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      name === user.name &&
      email === user.email &&
      role === user.role &&
      status === user.status
    ) {
      setIsLoading(false);
      setShowModal(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/user/${user.id}`, {
        name: name,
        email: email,
        role: role,
        status: status,
      });
      toast({
        title: "User edited successfully",
        description: `User: ${response.data.name}, Role: ${response.data.role}`,
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
                    Update User: {user.name}
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
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="role"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Role:
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                      <option value="" hidden>
                        Select Role
                      </option>
                      <option value={UserRole.TEACHER}>Teacher</option>
                      <option value={UserRole.STUDENT}>Student</option>
                    </select>
                    <label
                      htmlFor="status"
                      className="block font-medium text-gray-700  text-black dark:text-white"
                    >
                      Status:
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="border border-gray-300 rounded-md p-2 w-full  text-black"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as UserStatus)}
                    >
                      <option value="" hidden>
                        Select Status
                      </option>
                      <option value={UserStatus.ACTIVE}>Active</option>
                      <option value={UserStatus.IN_ACTIVE}>In Active</option>
                      <option value={UserStatus.BANNED}>Banned</option>
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
