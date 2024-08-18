import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  imdbId: integer("imdb_id").unique(),
  title: varchar("title", { length: 255 }).notNull(),
  posterPath: varchar("poster_path", { length: 255 }),
  overview: text("overview"),
  releaseDate: date("release_date"),
  runtime: integer("runtime"),
  genres: jsonb("genres"),
  language: varchar("language", { length: 50 }),
  director: varchar("director", { length: 100 }),
  cast: jsonb("cast"),
  trailerUrl: varchar("trailer_url", { length: 255 }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const movieSchema = z.object({
  imdbId: z.number().optional(),
  title: z.string().max(255),
  posterPath: z.string().max(255).optional(),
  overview: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  runtime: z.number().int().positive().optional(),
  genres: z.array(z.string()).optional(),
  language: z.string().max(50).optional(),
  director: z.string().max(100).optional(),
  cast: z.array(z.string()).optional(),
  trailerUrl: z.string().url().max(255).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const movieUpdateSchema = movieSchema.partial();
