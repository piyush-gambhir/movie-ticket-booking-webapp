import React from "react";
import { redirect } from "next/navigation";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

import SignUp from "@/components/auth/SignUp";

import auth from "@/lib/auth";

export default async function page() {
  const session = await auth();
  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return <SignUp />;
}
