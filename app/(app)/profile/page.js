import React from "react";
import { redirect } from "next/navigation";

import { getServerSession, getCurrentUser } from "@/lib/auth";

import { getUserByEmail } from "@/actions/user";

import Profile from "@/components/app/Profile";

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/routes";

export default async function page() {
  const session = await getServerSession();
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT);
  const user = await getCurrentUser();
  const userDetails = await getUserByEmail({ email: user.email });
  return <Profile userDetails={userDetails} />;
}
