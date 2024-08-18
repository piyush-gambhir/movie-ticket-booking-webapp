import { db } from "@/lib/db";

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
// const marritalStatusEnum = pgEnum("marrital_status", ["single", "married"]);
// const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  emailVerified: timestamp("email_verified"),
  phone: jsonb("phone"),
  dateOfBirth: timestamp("dob"),
  // gender: genderEnum("gender"),
  // marritalStatus: marritalStatusEnum("marrital_status"),
  role: userRoleEnum("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const selectUserSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users, {
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z
    .string()
    .email()
    .max(255)
    .transform((val) => val.toLowerCase()),
  // .refine(
  //   async (val) => {
  //     const user = await db.select().from(users).where({ email: val });
  //     return !user;
  //   },
  //   { message: "Email already exists." },
  // ),
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/),
});
