import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { theatres } from "@/lib/db/schema/theatres.schema";
import { eq } from "drizzle-orm";

import {
  theatreSchema,
  theatreUpdateSchema,
  deleteTheatreSchema,
} from "@/lib/zod/theaters";

export async function GET(request, { params }) {
  try {
    const parsedParams = theatreSchema.parse(params); // Validate params using Zod
    const theatre = await db
      .select()
      .from(theatres)
      .where(eq(theatres.id, parsedParams.id))
      .limit(1)
      .execute();

    if (theatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }

    return NextResponse.json(theatre[0]);
  } catch (error) {
    console.error("Failed to fetch theatre:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch theatre" },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const validatedData = theatreUpdateSchema.parse(body); // Validate body using Zod
    const parsedParams = theatreSchema.parse(params); // Validate params using Zod

    const updatedTheatre = await db
      .update(theatres)
      .set(validatedData)
      .where(eq(theatres.id, parsedParams.id))
      .returning()
      .execute();

    if (updatedTheatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTheatre[0]);
  } catch (error) {
    console.error("Failed to update theatre:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update theatre" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const parsedParams = deleteTheatreSchema.parse(params); // Validate params using Zod

    const deletedTheatre = await db
      .delete(theatres)
      .where(eq(theatres.id, parsedParams.id))
      .returning()
      .execute();

    if (deletedTheatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Theatre deleted successfully" });
  } catch (error) {
    console.error("Failed to delete theatre:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to delete theatre" },
      { status: 500 },
    );
  }
}
