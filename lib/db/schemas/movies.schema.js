import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  language: varchar("language", { length: 50 }),
  genre: varchar("genre", { length: 100 }),
  director: varchar("director", { length: 100 }),
  trailerUrl: varchar("trailer_url", { length: 255 }),
  description: text("description"),
  duration: integer("duration"),
  releaseDate: date("release_date").notNull(),
  endDate: date("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
