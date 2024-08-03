import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

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
  updatedAt: timestamp("updated_at"),
});
