import React from "react";

import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";

import GoogleLogo from "@/icons/GoogleLogo";

export default function FacebookSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("facebook");
      }}
    >
      <Button variant="outline" className="flex w-full gap-x-2">
        <GoogleLogo className={"h-6 w-6"} />
        Login with Facebook
      </Button>
    </form>
  );
}
