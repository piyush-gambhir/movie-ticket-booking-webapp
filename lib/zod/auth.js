import { z } from "zod";

export const signInWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpWithPasswordSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const linkOAuthAccountSchema = z.object({
  provider: z.string(),
});
