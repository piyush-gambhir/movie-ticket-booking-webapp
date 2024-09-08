import Image from "next/image";
import Link from "next/link";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

import SignUpWithPasswordForm from "./SignUpWithPasswordForm";

export default function SignUp() {
  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary">
            Sign in
          </Link>
        </p>
      </div>
      <SignUpWithPasswordForm />
      <GoogleSignInButton />
    </>
  );
}
