import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { theaters } from "@/lib/db/schema/theaters.schema";
import { eq } from "drizzle-orm";

import {
  theaterSchema,
  updateTheaterSchema,
  deleteTheaterSchema,
} from "@/lib/zod/theater";

export async function GET(request, { params }) {
  try {
    const parsedParams = theaterSchema.parse(params); // Validate params using Zod
    const theater = await db
      .select()
      .from(theaters)
      .where(eq(theaters.id, parsedParams.id))
      .limit(1)
      .execute();

    if (theater.length === 0) {
      return NextResponse.json({ error: "theater not found" }, { status: 404 });
    }

    return NextResponse.json(theater[0]);
  } catch (error) {
    console.error("Failed to fetch theater:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch theater" },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const validatedData = updateTheaterSchema.parse(body); // Validate body using Zod
    const parsedParams = theaterSchema.parse(params); // Validate params using Zod

    const updatedtheater = await db
      .update(theaters)
      .set(validatedData)
      .where(eq(theaters.id, parsedParams.id))
      .returning()
      .execute();

    if (updatedtheater.length === 0) {
      return NextResponse.json({ error: "theater not found" }, { status: 404 });
    }

    return NextResponse.json(updatedtheater[0]);
  } catch (error) {
    console.error("Failed to update theater:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update theater" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const parsedParams = deleteTheaterSchema.parse(params); // Validate params using Zod

    const deletedtheater = await db
      .delete(theaters)
      .where(eq(theaters.id, parsedParams.id))
      .returning()
      .execute();

    if (deletedtheater.length === 0) {
      return NextResponse.json({ error: "theater not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "theater deleted successfully" });
  } catch (error) {
    console.error("Failed to delete theater:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to delete theater" },
      { status: 500 },
    );
  }
}
