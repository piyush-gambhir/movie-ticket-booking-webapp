import { z } from "zod";
import { ilike, asc, desc, count } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { theaters } from "@/lib/db/schema/theaters.schema";

import { theaterSearchSchema, addTheaterSchema } from "@/lib/zod/theater";

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
        ? theaters.name
        : queryParams.sort === "location"
          ? theaters.location
          : theaters.createdAt;

    let whereCondition = undefined;
    if (queryParams.query) {
      whereCondition = ilike(theaters.name, `%${queryParams.query}%`);
    }

    const totaltheatersResult = await db
      .select({ count: count() })
      .from(theaters)
      .where(whereCondition)
      .execute();
    const totalCount = parseInt(totaltheatersResult[0].count, 10);
    const totalPages = Math.ceil(totalCount / queryParams.limit);

    const alltheaters = await db
      .select()
      .from(theaters)
      .where(whereCondition)
      .orderBy(sortOrder(sortField))
      .limit(queryParams.limit)
      .offset(offset)
      .execute();

    return NextResponse.json({
      data: alltheaters,
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
    const theaterData = addTheaterSchema.parse(body); // Validate request body using zod schema

    const [newTheater] = await db
      .insert(theaters) // Insert the validated data into the database
      .values(theaterData)
      .returning() // Return the inserted data
      .execute();

    return NextResponse.json(newTheater);
  } catch (error) {
    console.error("Error in POST handler:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
