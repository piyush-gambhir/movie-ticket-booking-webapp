import { z } from "zod";
import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const theatres = pgTable("theatres", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  address: jsonb("address").notNull(),
  totalSeats: integer("total_seats").notNull(),
  seats: jsonb("seats").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  contactNumber: varchar("contact_number", { length: 20 }),
  email: varchar("email", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const theatreSchema = z.object({
  name: z.string().max(255),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  totalSeats: z.number().int().positive(),
  seats: z.array(
    z.object({
      row: z.string(),
      seatNumber: z.number().int().positive(),
      type: z.enum(["standard", "premium", "vip"]),
    }),
  ),
  imageUrl: z.string().url().max(255).optional(),
  contactNumber: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
});

export const theatreUpdateSchema = theatreSchema.partial();
