import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  boolean,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";

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
  genres: varchar("genres", { length: 255 }).array(),
  originalLanguage: varchar("original_language", { length: 50 }),
  voteAverage: doublePrecision("vote_average"),
  voteCount: integer("vote_count"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
