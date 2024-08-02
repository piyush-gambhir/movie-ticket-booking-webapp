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

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: jsonb("phone"),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
