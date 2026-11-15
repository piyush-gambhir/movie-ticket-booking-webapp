import { z } from "zod";
import { ilike, asc, desc, count, and, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { movies } from "@/lib/db/schema/movies.schema";
import { addMovieSchema, movieSearchSchema } from "@/lib/zod/movie";
import { addData } from "@/lib/typesense/actions/add-data";
import { searchData } from "@/lib/typesense/actions/search-data";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = movieSearchSchema.parse({
      query: searchParams.get("query") || "",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit"))
        : 10,
      sort: searchParams.get("sort") || "releaseDate",
      order: searchParams.get("order") || "desc",
    });

    const offset = (queryParams.page - 1) * queryParams.limit;

    const sortOrder = queryParams.order === "asc" ? asc : desc;
    let sortField;
    if (queryParams.sort === "title") {
      sortField = movies.title;
    } else if (queryParams.sort === "releaseDate") {
      sortField = movies.releaseDate;
    } else {
      sortField = movies.createdAt;
    }

    let whereCondition;
    if (queryParams.query) {
      whereCondition = ilike(movies.title, `%${queryParams.query}%`);
    }

    const pathCondition = and(
      ne(movies.backdropPath, "https://image.tmdb.org/t/p/w500/None"),
      ne(movies.posterPath, "https://image.tmdb.org/t/p/w500/None"),
    );

    if (whereCondition) {
      whereCondition = and(whereCondition, pathCondition);
    } else {
      whereCondition = pathCondition;
    }

    const totalMoviesResult = await db
      .select({ count: count() })
      .from(movies)
      .where(whereCondition)
      .execute();
    const totalCount = parseInt(totalMoviesResult[0].count, 10);
    const totalPages = Math.ceil(totalCount / queryParams.limit);

    const allMovies = await db
      .select()
      .from(movies)
      .where(whereCondition)
      .orderBy(sortOrder(sortField))
      .limit(queryParams.limit)
      .offset(offset)
      .execute();

    return NextResponse.json(
      {
        data: allMovies,
        pagination: {
          currentPage: queryParams.page,
          limit: queryParams.limit,
          totalPages: totalPages,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
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
    await addData({ collectionName: "movies", documentData: newMovie });
    return NextResponse.json(newMovie);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
