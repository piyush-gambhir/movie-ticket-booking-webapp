import React from "react";
import { redirect } from "next/navigation";

import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";

import { getServerSession, getCurrentUser } from "@/lib/auth";

export default async function Layout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }

  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}
