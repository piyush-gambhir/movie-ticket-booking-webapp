import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path according to your project structure
import {
  movies,
  movieSchema,
  movieUpdateSchema,
} from "@/lib/db/schemas/movies.schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Get all movies
export async function GET() {
  try {
    const allMovies = await db.select().from(movies).execute();
    return NextResponse.json(allMovies);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a movie
export async function POST(request) {
  try {
    const body = await request.json();
    const movieData = movieSchema.parse(body);

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

// Update a movie
export async function PUT(request) {
  try {
    const body = await request.json();
    const movieData = movieUpdateSchema.parse(body);

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

// Delete a movie
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 },
      );
    }

    await db.delete(movies).where(eq(movies.id, id)).execute();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
