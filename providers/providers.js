import React from "react";

import auth from "@/lib/auth";

import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

export default async function Providers({ children }) {
  const authSession = await auth();
  return (
    <NextAuthSessionProvider session={authSession}>
      {children}
    </NextAuthSessionProvider>
  );
}
