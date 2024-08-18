"use server";

import { env } from "@/env";

import {
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByEmailVerificationTokenSchema,
  getUserByResetPasswordTokenSchema,
} from "@/lib/zod/user";

export const handleGetUserById = async (id) => {
  try {
    const validatedInput = getUserByIdSchema.safeParse({ id });
    if (!validatedInput.success) {
      return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetUserByEmail = async (email) => {
  try {
    const validatedInput = getUserByEmailSchema.safeParse({ email });
    if (!validatedInput.success) {
      return;
    }

    const user = await fetch(`
      ${env.NEXT_PUBLIC_API_URL}/api/v1/user/${validatedInput.data.email}
    `);

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const handleGetUserByResetPasswordToken = async (token) => {
  try {
    const validatedInput = getUserByResetPasswordTokenSchema.safeParse({
      token,
    });
    if (!validatedInput.success) {
      return;
    }

    const user = await prisma.user.findUnique({
      where: { resetPasswordToken: validatedInput.data.token },
    });

    setUser(user);
  } catch (error) {
    console.error(error);
  }
};

export const handleGetUserByEmailVerificationToken = async (token) => {
  try {
    const validatedInput = getUserByEmailVerificationTokenSchema.safeParse({
      token,
    });
    if (!validatedInput.success) {
      return;
    }

    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: validatedInput.data.token },
    });

    setUser(user);
  } catch (error) {
    console.error(error);
  }
};
