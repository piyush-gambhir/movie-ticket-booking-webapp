import React from "react";

import auth from "@/lib/auth";

import { RecoilRootProvider } from "@/providers/RecoilRootProvider";
import { NextAuthSessionProvider } from "@/providers/NextAuthSessionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default async function Providers({ children }) {
  const authSession = await auth();
  return (
    <RecoilRootProvider>
      <NextAuthSessionProvider session={authSession}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NextAuthSessionProvider>
    </RecoilRootProvider>
  );
}
