// schemas/userSchema.js
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email address").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255),
  phone: z
    .object({
      countryCode: z.string().optional(),
      number: z.string().optional(),
    })
    .optional(),
  role: z.enum(["admin", "user", "superadmin"]),
});

export const userUpdateSchema = userSchema.partial();
