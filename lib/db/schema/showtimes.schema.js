import { pgTable, uuid, decimal, timestamp } from "drizzle-orm/pg-core";
import { movies } from "./movies.schema";
import { theaters } from "./theaters.schema";

export const showtimes = pgTable("showtimes", {
  id: uuid("id").primaryKey().defaultRandom(),
  movieId: uuid("movie_id")
    .references(() => movies.id)
    .notNull(),
  theaterId: uuid("theater_id")
    .references(() => theaters.id)
    .notNull(),
  ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
