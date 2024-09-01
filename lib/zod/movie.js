import { z } from "zod";

export const movieSearchSchema = z.object({
  query: z.string().max(255),
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
});

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
  mediaType: z.string().max(50).optional(),
  originalLanguage: z.string().max(50).optional(),
  voteAverage: z.number().optional(),
  voteCount: z.number().int().optional(),
});

export const addMovieSchema = z.object({
  imdbId: z.string().optional(),
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

export const updateMovieSchema = addMovieSchema.partial();

export const deletreMovieSchema = z.object({
  id: z.string().uuid(),
});
