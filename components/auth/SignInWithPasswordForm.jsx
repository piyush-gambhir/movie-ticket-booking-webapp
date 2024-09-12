"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";

import { signInWithPassword } from "@/actions/auth";

import { signInWithPasswordSchema } from "@/lib/zod/auth";

export default function SignInWithPasswordForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    const result = await signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);
    if (result?.error === "Invalid credentials!") {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive", // You can customize this according to your toast system
      });
    } else if (result?.error === "Incorrect provider!") {
      // Show toast for 404 response
      toast({
        title: "Error",
        description: "User does not exist",
        variant: "destructive", // You can customize this according to your toast system
      });
    } else if (result?.error) {
      // Show toast for any other non-200 response
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
