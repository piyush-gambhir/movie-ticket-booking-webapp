import Image from "next/image";
import Link from "next/link";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

import BookMyShowLogo from "@/icons/BookMyShowLogo";
import SignUpWithPasswordForm from "./SignUpWithPasswordForm";

export default function SignUp() {
  return (
    <div className="h-screen w-screen md:grid md:grid-cols-5">
      <div className="flex h-full w-full flex-col justify-center px-8 md:col-span-2 md:px-24 md:py-12">
        <BookMyShowLogo className="h-24 w-24" />
        <div className="grid gap-6">
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
        </div>
      </div>
      <div className="hidden h-full w-full bg-black md:col-span-3 md:grid">
        <Image
          src="/login-bg.jpg"
          alt="Sign up for an account"
          width={1440}
          height={1024}
          className="h-full"
        />
      </div>
    </div>
  );
}
