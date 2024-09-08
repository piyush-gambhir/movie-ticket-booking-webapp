"use server";

import { z } from "zod";

import {
  addMovieSchema,
  movieSearchSchema,
  deleteMovieSchema,
  updateMovieSchema,
} from "@/lib/zod/movie";

export async function getMovies({
  query = "",
  page = 1,
  limit = 20,
  sort = "releaseDate",
  order = "asc",
}) {
  try {
    const movieSearchParams = movieSearchSchema.parse({
      query: query,
      page: page,
      limit: limit,
      sort: sort,
      order: order,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies?${new URLSearchParams({
        query: movieSearchParams.query,
        page: movieSearchParams.page,
        limit: movieSearchParams.limit,
        sort: movieSearchParams.sort,
        order: movieSearchParams.order,
      })}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to retrieve movies.",
      };
    }

    const movies = await response.json();
    return {
      success: true,
      data: {
        movies: movies.data,
        pagination: movies.pagination,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function getMovie({ movieId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies/${movieId}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to retrieve movie.",
      };
    }

    const movie = await response.json();
    return { success: true, data: movie };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addMovie({ movieData }) {
  try {
    const validatedData = addMovieSchema.parse(movieData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );

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

export async function updateMovie({ movieData }) {
  try {
    const validatedData = updateMovieSchema.parse(movieData);

    if (!validatedData.id) {
      throw new Error("Movie ID is required for updates.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies/${validatedData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );

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

export async function deleteMovie({ movieId }) {
  try {
    const validatedData = deleteMovieSchema.parse({ id: movieId });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete movie.",
      };
    }

    const message = await response.json().then((data) => data.message);
    return { success: true, message: message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}
