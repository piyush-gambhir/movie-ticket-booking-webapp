"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import GoogleSignInButton from "@/components/common/auth/GoogleSignInButton";
import BookMyShowLogo from "@/icons/BookMyShowLogo";

import { SignUpAction } from "@/actions/auth";

export default function SignUp() {
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    console.log("submit");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = await SignUpAction(data);

    if (result?.errors) {
      setErrors(result.errors);
    } else {
      setErrors(null);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    placeholder="Max"
                    required
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-error">{errors.firstName}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder="Robinson"
                    required
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-error">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
                {errors?.email && (
                  <p className="text-sm text-error">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {errors?.password && (
                  <p className="text-sm text-error">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
          {/* <GoogleSignInButton /> */}
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
