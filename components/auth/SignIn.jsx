import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";
import SignInWithPasswordForm from "@/components/auth/SignInWithPasswordForm";

export default function SignInForm() {
  return (
    <>
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
      <div className="flex flex-col justify-between gap-y-4 sm:flex-row sm:items-center">
        <div className="order-2 flex items-center space-x-2 sm:order-1">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember for 30 days</Label>
        </div>
        <Link
          href="/forgot-password"
          className="order-1 ml-auto inline-block text-sm font-medium text-primary sm:order-2"
        >
          Forgot your password?
        </Link>
      </div>
      <GoogleSignInButton />
    </>
  );
}
