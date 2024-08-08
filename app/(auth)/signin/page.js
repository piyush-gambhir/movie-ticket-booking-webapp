import React from "react";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

export default async function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1>Sign In</h1>
      <GoogleSignInButton />
    </div>
  );
}
