import { z } from "zod";

export const theaterSchema = z.object({
  name: z.string().max(255),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  totalSeats: z.number().int().positive(),
  seats: z
    .array(
      z.object({
        row: z.string(),
        seatNumber: z.number().int().positive(),
        type: z.enum(["standard", "premium", "vip"]),
      }),
    )
    .optional(),
  imageUrl: z.string().url().max(255).optional(),
  contactNumber: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
});

export const theaterSearchSchema = z.object({
  query: z.string().max(255).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
  sort: z.enum(["name", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const addTheaterSchema = theaterSchema.omit({ id: true });

export const updateTheaterSchema = theaterSchema.partial();

export const getTheaterSchema = z.object({
  id: z.string().uuid(),
});

export const deleteTheaterSchema = z.object({
  id: z.string().uuid(),
});
