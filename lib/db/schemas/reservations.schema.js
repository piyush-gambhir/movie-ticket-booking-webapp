import {
  pgTable,
  uuid,
  jsonb,
  varchar,
  decimal,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { showtimes } from "./showtimes.schema";
import { users } from "./users.schema";

export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  showtimeId: uuid("showtime_id")
    .references(() => showtimes.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  seats: jsonb("seats").notNull(),
  orderId: varchar("order_id", { length: 100 }).unique(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  status: reservationStatusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
