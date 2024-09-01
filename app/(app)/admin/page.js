import React from "react";
import { notFound } from "next/navigation";

import { getServerSession, getCurrentUser } from "@/lib/auth";
import Admin from "@/components/Admin";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return notFound();
  }

  const user = await getCurrentUser();
  console.log(user);
  if (user.role === "user") {
    return notFound();
  }

  return <Admin />;
}
