import React from "react";

import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";

import { getServerSession, getCurrentUser } from "@/lib/auth";

export default async function Layout({ children }) {
  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}
