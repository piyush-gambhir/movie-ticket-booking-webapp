import Image from "next/image";
import Link from "next/link";

import SignUpForm from "@/components/SignUpForm";
import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

import BookMyShowLogo from "@/icons/BookMyShowLogo";

export default function SignUp() {
  return (
    <div className="grid h-screen w-screen grid-cols-5">
      <div className="col-span-2 flex h-full w-full flex-col justify-center px-24 py-12">
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
          <SignUpForm />
          <GoogleSignInButton />
        </div>
      </div>
      <div className="col-span-3 grid h-full w-full bg-black">
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
