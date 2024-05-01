import { useSession } from "next-auth/react";

export const useCurrentStatus = () => {
  const session = useSession();

  return session.data?.user?.status;
};
