import React from "react";
import { notFound } from "next/navigation";

import { getServerSession } from "@/lib/auth";

import SignOut from "@/components/auth/SignOut";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return notFound();
  }

  return <SignOut />;
}
