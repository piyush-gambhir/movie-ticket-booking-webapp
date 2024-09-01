import Image from "next/image";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

import SignInWithPasswordForm from "./SignInWithPasswordForm";

export default function SignIn() {
  return (
    <div className="h-screen w-screen md:grid md:grid-cols-5">
      <div className="flex h-full w-full flex-col justify-center px-24 py-12 md:col-span-2">
        <Image src={"/logo.png"} alt="Logo" width={80} height={50} />{" "}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              New to the platform?{" "}
              <Link href="/signup" className="font-medium text-primary">
                Create an account
              </Link>
            </p>
          </div>
          <SignInWithPasswordForm />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember for 30 days</Label>
              </div>
            </div>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm font-medium text-primary"
            >
              Forgot your password?
            </Link>
          </div>
          <GoogleSignInButton />
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className="col-span-3 hidden h-full w-full bg-black md:grid">
        <Image
          src="/login-bg.jpg"
          alt="Sign in to your account"
          width={1440}
          height={1024}
          className="h-full"
        />
      </div>
    </div>
  );
}
