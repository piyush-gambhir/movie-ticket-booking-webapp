import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  jsonb,
  boolean,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  imdbId: varchar("imdb_id").unique(),
  title: varchar("title", { length: 255 }).notNull(),
  originalTitle: varchar("original_title", { length: 255 }).notNull(),
  backdropPath: varchar("backdrop_path", { length: 255 }),
  posterPath: varchar("poster_path", { length: 255 }),
  overview: text("overview"),
  releaseDate: date("release_date"),
  popularity: doublePrecision("popularity"),
  adult: boolean("adult"),
  mediaType: varchar("media_type", { length: 50 }),
  originalLanguage: varchar("original_language", { length: 50 }),
  voteAverage: doublePrecision("vote_average"),
  voteCount: integer("vote_count"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const movieSchema = z.object({
  imdbId: z.number().optional(),
  title: z.string().max(255),
  originalTitle: z.string().max(255),
  backdropPath: z.string().max(255).optional(),
  posterPath: z.string().max(255).optional(),
  overview: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  popularity: z.number().optional(),
  adult: z.boolean().optional(),
  mediaType: z.string().max(50).optional(),
  originalLanguage: z.string().max(50).optional(),
  voteAverage: z.number().optional(),
  voteCount: z.number().int().optional(),
});

export const movieUpdateSchema = movieSchema.partial();
