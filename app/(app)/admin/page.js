import React from "react";
import { notFound } from "next/navigation";

import { getServerSession, getCurrentRole } from "@/lib/auth";
import Admin from "@/components/admin/Admin";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return notFound();
  }
  const currentRole = await getCurrentRole();

  if (currentRole === "user") {
    return notFound();
  }

  return <Admin />;
}
