"use server";

import {
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByEmailVerificationTokenSchema,
  getUserByResetPasswordTokenSchema,
} from "@/lib/zod/user";

export const getUserById = async (id) => {
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

export const getUserByEmail = async ({ email }) => {
  try {
    const validatedInput = getUserByEmailSchema.safeParse({ email });
    if (!validatedInput.success) {
      return { error: "Invalid fields!" };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user/${validatedInput.data.email}`,
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByResetPasswordToken = async (token) => {
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

export const getUserByEmailVerificationToken = async (token) => {
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
