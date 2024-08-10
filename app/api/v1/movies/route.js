import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { movies, movieSchema } from "../../../lib/db/schema/movies.schema";

export async function GET() {
  try {
    const allMovies = await db.select().from(movies);
    return NextResponse.json(allMovies);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = movieSchema.parse(body);
    const newMovie = await db.insert(movies).values(validatedData).returning();
    return NextResponse.json(newMovie[0], { status: 201 });
  } catch (error) {
    console.error("Failed to create movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 400 },
    );
  }
}
