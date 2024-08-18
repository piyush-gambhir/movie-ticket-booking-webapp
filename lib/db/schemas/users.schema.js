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
// const marritalStatusEnum = pgEnum("user_marrital_status", ["single", "married"]);
// const genderEnum = pgEnum("user_gender", ["male", "female", "other"]);
// const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  emailVerified: timestamp("email_verified"),
  phone: jsonb("phone"),
  dateOfBirth: timestamp("dob"),
  role: userRoleEnum("role").default("user"),
  // status: userStatusEnum("status").default("active"),
  // gender: genderEnum("gender"),
  // marritalStatus: marritalStatusEnum("marrital_status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const selectUserSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(2).max(255),
  email: z
    .string()
    .email()
    .max(255)
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/),
});
