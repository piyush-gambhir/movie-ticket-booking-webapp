import { z } from "zod";

export const getUserByIdSchema = z.object({
  id: z.string(),
});

export const getUserByEmailSchema = z.object({
  email: z.string().email(),
});

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
});

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
});
