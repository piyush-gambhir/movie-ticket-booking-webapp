import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
  users,
  insertUserSchema,
  selectUserSchema,
} from "@/lib/db/schemas/users.schema";

export async function GET(request) {
  try {
    const { page = 1, limit = 10 } = request.query;
    const offset = (page - 1) * limit;
    const allUsers = await db.select().from(users);
    const parsedUsers = allUsers.map((user) => selectUserSchema.parse(user));

    return NextResponse.json({
      data: parsedUsers.slice(offset, offset + limit),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(allUsers.length / limit),
        total: allUsers.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    await insertUserSchema.parseAsync(userData);
    await db.insert(users).values(userData);
    return NextResponse.json({ message: "User successfully created." });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
