import Image from "next/image";
import Link from "next/link";

import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";

export default function SignIn() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2 grid w-full items-center p-24">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              New to the platform?{" "}
              <Link href="/signup" className="font-medium text-primary">
                Create an account
              </Link>
            </p>
          </div>
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>

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
      <div className="col-span-3 grid">
        <Image
          src="/images/signin.svg"
          alt="Sign in to your account"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}
