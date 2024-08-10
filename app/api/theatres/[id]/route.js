import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import {
  theatres,
  theatreUpdateSchema,
} from "../../../../lib/db/schema/theatres.schema";
import { eq } from "drizzle-orm";

export async function GET(request, { params }) {
  try {
    const theatre = await db
      .select()
      .from(theatres)
      .where(eq(theatres.id, params.id))
      .limit(1);
    if (theatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }
    return NextResponse.json(theatre[0]);
  } catch (error) {
    console.error("Failed to fetch theatre:", error);
    return NextResponse.json(
      { error: "Failed to fetch theatre" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const validatedData = theatreUpdateSchema.parse(body);
    const updatedTheatre = await db
      .update(theatres)
      .set(validatedData)
      .where(eq(theatres.id, params.id))
      .returning();
    if (updatedTheatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTheatre[0]);
  } catch (error) {
    console.error("Failed to update theatre:", error);
    return NextResponse.json(
      { error: "Failed to update theatre" },
      { status: 400 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedTheatre = await db
      .delete(theatres)
      .where(eq(theatres.id, params.id))
      .returning();
    if (deletedTheatre.length === 0) {
      return NextResponse.json({ error: "Theatre not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Theatre deleted successfully" });
  } catch (error) {
    console.error("Failed to delete theatre:", error);
    return NextResponse.json(
      { error: "Failed to delete theatre" },
      { status: 500 },
    );
  }
}
