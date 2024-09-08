import { auth } from "@/auth";
export default auth;

export const getServerSession = async () => {
  const session = await auth();

  return session;
};

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const getCurrentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
