import { z } from "zod";

export const movieSchema = z.object({
  id: z.string().uuid(),
  imdbId: z.string().optional(),
  title: z.string().max(255),
  originalTitle: z.string().max(255),
  backdropPath: z.string().max(255).optional(),
  posterPath: z.string().max(255).optional(),
  overview: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  popularity: z.number().optional(),
  adult: z.boolean().optional(),
  genres: z.array(z.string().max(50)).optional(),
  mediaType: z.string().max(50).optional(),
  originalLanguage: z.string().max(50).optional(),
  voteAverage: z.number().optional(),
  voteCount: z.number().int().optional(),
});

export const movieSearchSchema = z.object({
  query: z.string().max(255).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
  sort: z.enum(["title", "dateAdded", "releaseDate"]).default("releaseDate"),
  order: z.enum(["asc", "desc"]).optional(),
});

export const addMovieSchema = movieSchema.omit({ id: true });

export const updateMovieSchema = movieSchema.partial();

export const getMovieSchema = z.object({
  id: z.string().uuid(),
});

export const deleteMovieSchema = z.object({
  id: z.string().uuid(),
});
