"use server";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/actions/user";

import { signIn, signOut } from "@/auth";

import {
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
} from "@/lib/zod/auth";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

export const logout = async () => {
  await signOut();
};

export async function signUpWithPassword({ email, password, name }) {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse({
      name: name,
      email: email,
      password: password,
    });
    if (!validatedInput.success) {
      return { error: "Invalid fields!" };
    }
    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });

    if (!existingUser?.error) {
      return { error: "Email already in use!" };
    }

    const newUser = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user`,
      {
        method: "POST",
        body: JSON.stringify({
          name: validatedInput.data.name,
          email: validatedInput.data.email,
          password: validatedInput.data.password,
        }),
      },
    ).then((res) => res.json());



    if (newUser.error) {
      return { error: newUser.error };
    }

    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

export async function signInWithPassword({ email, password }) {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse({
      email: email,
      password: password,
    });

    if (!validatedInput.success) {
      return { error: "Invalid fields!" };
    }

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });

    if (!existingUser) {
      return { error: "User not found!" };
    }

    if (!existingUser.password) {
      return { error: "Incorrect provider!" };
    }

    const isPasswordValid = await verifyPassword(
      validatedInput.data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return { error: "Invalid credentials!" };
    }
    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          throw error;
      }
    } else {
      throw new Error("Error signing in with password");
    }
  }
}
