import { z } from "zod";
import { ilike, asc, desc, count } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { theatres } from "@/lib/db/schema/theaters.schema";

import { theaterSearchSchema } from "@/lib/zod/theaters";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = theaterSearchSchema.parse({
      query: searchParams.get("query") || "",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit"))
        : 10,
      sort: searchParams.get("sort") || "name",
      order: searchParams.get("order") || "asc",
    });

    const offset = (queryParams.page - 1) * queryParams.limit;

    const sortOrder = queryParams.order === "asc" ? asc : desc;
    const sortField =
      queryParams.sort === "name"
        ? theatres.name
        : queryParams.sort === "location"
          ? theatres.location
          : theatres.createdAt;

    let whereCondition = undefined;
    if (queryParams.query) {
      whereCondition = ilike(theatres.name, `%${queryParams.query}%`);
    }

    const totalTheatresResult = await db
      .select({ count: count() })
      .from(theatres)
      .where(whereCondition)
      .execute();
    const totalCount = parseInt(totalTheatresResult[0].count, 10);
    const totalPages = Math.ceil(totalCount / queryParams.limit);

    const allTheatres = await db
      .select()
      .from(theatres)
      .where(whereCondition)
      .orderBy(sortOrder(sortField))
      .limit(queryParams.limit)
      .offset(offset)
      .execute();

    return NextResponse.json({
      data: allTheatres,
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
