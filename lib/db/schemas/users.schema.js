import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const userRoleEnum = pgEnum("user_role", ["admin", "user", "superadmin"]);
const marritalStatusEnum = pgEnum("marrital_status", ["single", "married"]);
const genderEnum = pgEnum("gender", ["male", "female"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  emailVerified: timestamp("email_verified").defaultNow(),
  phone: jsonb("phone"),
  dateOfBirth: timestamp("dob"),
  gender: genderEnum(),
  marritalStatus: marritalStatusEnum(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const customUserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
  image: z.string().optional(),
  emailVerified: z.date().optional(),
  phone: z
    .object({
      countryCode: z.string(),
      number: z.string(),
    })
    .optional(),
  dateOfBirth: z.date().optional().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  marritalStatus: z.enum(["single", "married"]).optional(),
  role: z.enum(["admin", "user", "superadmin"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
