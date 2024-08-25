import { cache } from "react";
import { auth } from "@/auth";

export default cache(auth);

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
