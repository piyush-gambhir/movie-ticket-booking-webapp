import React from "react";
import { redirect } from "next/navigation";

import SignIn from "@/components/auth/SignIn";

import auth from "@/lib/auth";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export default async function page() {
  const session = await auth();
  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return <SignIn />;
}
