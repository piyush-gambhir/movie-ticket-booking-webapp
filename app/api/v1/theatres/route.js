import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { theatres, theatreSchema } from "@/lib/db/schema/theatres.schema";

export async function GET() {
  try {
    const allTheatres = await db.select().from(theatres);
    return NextResponse.json(allTheatres);
  } catch (error) {
    console.error("Failed to fetch theatres:", error);
    return NextResponse.json(
      { error: "Failed to fetch theatres" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = theatreSchema.parse(body);
    const newTheatre = await db
      .insert(theatres)
      .values(validatedData)
      .returning();
    return NextResponse.json(newTheatre[0], { status: 201 });
  } catch (error) {
    console.error("Failed to create theatre:", error);
    return NextResponse.json(
      { error: "Failed to create theatre" },
      { status: 400 },
    );
  }
}
