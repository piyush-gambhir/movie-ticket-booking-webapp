import React from "react";
import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="w-screem flex h-screen items-center justify-center">
      <Loader2
        className="mx-auto mb-8 h-16 w-16 animate-spin text-primary"
        aria-hidden="true"
      />
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Signing Out</h1>
      <p className="mx-auto mb-8 max-w-md text-xl">
        Please wait while we securely log you out of your account.
      </p>
    </div>
  );
}
