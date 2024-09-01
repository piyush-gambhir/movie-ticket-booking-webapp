import { z } from "zod";
import { eq, ilike, asc, desc, count } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { movies } from "@/lib/db/schema/movies.schema";

import { addMovieSchema, movieSearchSchema } from "@/lib/zod/movie";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = movieSearchSchema.parse({
      query: searchParams.get("query") || "",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit"))
        : 10,
      sort: searchParams.get("sort") || "dateAdded",
      order: searchParams.get("order") || "desc",
    });

    const offset = (queryParams.page - 1) * queryParams.limit;

    // Determine sort order and field
    const sortOrder = queryParams.order === "asc" ? asc : desc;
    const sortField =
      queryParams.sort === "title" ? movies.title : movies.createdAt;

    // Build query condition
    let whereCondition = undefined;
    if (queryParams.query) {
      whereCondition = ilike(movies.title, `%${queryParams.query}%`);
    }
    const totalMoviesResult = await db
      .select({ count: count() })
      .from(movies)
      .where(whereCondition)
      .execute();
    const totalCount = parseInt(totalMoviesResult[0].count, 10);
    const totalPages = Math.ceil(totalCount / queryParams.limit);

    // Fetch movies with pagination and sorting
    const allMovies = await db
      .select()
      .from(movies)
      .where(whereCondition)
      .orderBy(sortOrder(sortField)) // Correct usage of sorting function
      .limit(queryParams.limit)
      .offset(offset)
      .execute();

    return NextResponse.json({
      data: allMovies,
      pagination: {
        currentPage: queryParams.page,
        limit: queryParams.limit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);

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
