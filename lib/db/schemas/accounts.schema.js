import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "@/lib/db/schemas/users.schema";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  providerType: varchar("provider_type", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 255 }),
  accessToken: varchar("access_token", { length: 255 }),
  accessTokenExpires: timestamp("access_token_expires"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
