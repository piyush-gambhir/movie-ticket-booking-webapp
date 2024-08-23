import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "user",
  "superadmin",
]);
export const marritalStatusEnum = pgEnum("user_marrital_status", [
  "single",
  "married",
]);
export const genderEnum = pgEnum("user_gender", ["male", "female", "other"]);
export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);

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
