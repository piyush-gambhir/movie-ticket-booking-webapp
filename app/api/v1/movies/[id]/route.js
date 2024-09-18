import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { movies } from "@/lib/db/schema/movies.schema";
import { updateData } from "@/lib/typesense/actions/update-data";
import { deleteData } from "@/lib/typesense/actions/delete-data";
import {
  getMovieSchema,
  updateMovieSchema,
  deleteMovieSchema,
} from "@/lib/zod/movie";

export async function GET(request, { params }) {
  try {
    const parsedParams = getMovieSchema.parse(params);
    const movie = await db
      .select()
      .from(movies)
      .where(eq(movies?.id, parsedParams?.id))
      .limit(1);
    if (movie.length === 0) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie[0], {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const validatedData = updateMovieSchema.parse(body);
    const updatedMovie = await db
      .update(movies)
      .set(validatedData)
      .where(eq(movies.id, params.id))
      .returning();
    if (updatedMovie.length === 0) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    await updateData({
      collectionName: "movies",
      documentData: updatedMovie[0],
    });

    return NextResponse.json(updatedMovie[0]);
  } catch (error) {
    console.error("Failed to update movie:", error);
    return NextResponse.json(
      { error: "Failed to update movie" },
      { status: 400 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const parsedParams = deleteMovieSchema.parse(params);
    const deletedMovie = await db
      .delete(movies)
      .where(eq(movies.id, parsedParams.id))
      .returning();
    if (deletedMovie.length === 0) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    await deleteData({
      collectionName: "movies",
      documentId: parsedParams.id,
    });
    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Failed to delete movie:", error);
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 },
    );
  }
}
