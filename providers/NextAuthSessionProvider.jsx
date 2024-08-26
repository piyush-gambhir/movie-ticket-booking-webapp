"use client";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useSetRecoilState } from "recoil";

import { userDetailsState } from "@/lib/atoms/userDetailsAtom";

import { getUserByEmail } from "@/actions/user";

export function NextAuthSessionProvider({ children, session }) {
  const setUser = useSetRecoilState(userDetailsState);
  useEffect(() => {
    if (!session) {
      setUser(null);
    }

    if (session) {
      getUserByEmail({ email: session.user.email }).then((user) => {
        delete user.password;
        setUser(user);
      });
    }
  }, [session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
