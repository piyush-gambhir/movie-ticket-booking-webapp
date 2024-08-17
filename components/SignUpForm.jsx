"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const [errors, setErrors] = useState(null);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        const response = await fetch("/api/v1/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseBody = await response.json();
        console.log(responseBody);
      }}
    >
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
  );
}
