import {
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const marritalStatusEnum = pgEnum("user_marrital_status", [
  "single",
  "married",
]);
export const genderEnum = pgEnum("user_gender", ["male", "female", "other"]);
export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "user",
  "superadmin",
]);

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: varchar("password", { length: 255 }),
  phone: jsonb("phone"),
  dateOfBirth: timestamp("dob"),
  role: varchar("role", { length: 255 }).notNull(),
  status: userStatusEnum("status").notNull().default("active"),
  gender: genderEnum("gender"),
  marritalStatus: marritalStatusEnum("marrital_status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

//     type: text("type").notNull(),
//     token_type: text("token_type"),


//     credentialDeviceType: text("credentialDeviceType").notNull(),
