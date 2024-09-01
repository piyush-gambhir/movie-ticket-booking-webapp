"use server";

import { z } from "zod";

import {
  addMovieSchema,
  movieSearchSchema,
  deletreMovieSchema,
  updateMovieSchema,
} from "@/lib/zod/movie";

export async function getMovies({ query = "", page = 1, limit = 10 }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies?${new URLSearchParams({
        query,
        page,
        limit,
      })}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to retrieve movies.",
      };
    }
    const movies = await response.json();
    return { success: true, data: movies };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function addMovieAction(movieData) {
  try {
    const validatedData = addMovieSchema.parse(movieData);

    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to add movie.",
      };
    }

    const newMovie = await response.json();
    return { success: true, data: newMovie };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function updateMovieAction(movieData) {
  try {
    const validatedData = updateMovieSchema.parse(movieData);

    if (!validatedData.id) {
      throw new Error("Movie ID is required for updates.");
    }

    const response = await fetch("/api/movies", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to update movie.",
      };
    }

    const updatedMovie = await response.json();
    return { success: true, data: updatedMovie };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function deleteMovie(movieData) {
  try {
    const validatedData = deletreMovieSchema.parse(movieData);

    const response = await fetch("/api/movies", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete movie.",
      };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}
