import { z } from "zod";
import { eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { movies } from "@/lib/db/schema/movies.schema";

import {
  movieSchema,
  addMovieSchema,
  updateMovieSchema,
  deletreMovieSchema,
  movieSearchSchema,
} from "@/lib/zod/movie";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate search parameters using Zod schema
    const queryParams = movieSearchSchema.parse({
      query: searchParams.get("query") || "",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit"))
        : 10,
    });

    const offset = (queryParams.page - 1) * queryParams.limit;

    const allMovies = await db
      .select()
      .from(movies)
      .where(
        queryParams.query
          ? ilike(movies.title, `%${queryParams.query}%`)
          : undefined,
      )
      .limit(queryParams.limit)
      .offset(offset)
      .execute();

    return NextResponse.json(allMovies);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const movieData = addMovieSchema.parse(body);

    const [newMovie] = await db
      .insert(movies)
      .values(movieData)
      .returning()
      .execute();
    return NextResponse.json(newMovie);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const movieData = updateMovieSchema.parse(body);

    if (!movieData.id) {
      return NextResponse.json(
        { error: "ID is required for updates" },
        { status: 400 },
      );
    }

    const [updatedMovie] = await db
      .update(movies)
      .set(movieData)
      .where(eq(movies.id, movieData.id))
      .returning()
      .execute();

    return NextResponse.json(updatedMovie);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = deletreMovieSchema.parse(body);

    await db.delete(movies).where(eq(movies.id, id)).execute();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
