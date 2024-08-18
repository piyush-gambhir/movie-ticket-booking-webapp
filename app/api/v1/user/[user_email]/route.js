import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";

export async function GET(request, { params }) {
  try {
    const { user_email } = params;
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        phone: users.phone,
        dateOfBirth: users.dateOfBirth,
        role: users.role,
      })
      .from(users)
      .where(eq(users.email, user_email))
      .execute();
    if (user.length > 0) {
      return NextResponse.json(user[0]);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { user_email } = params;
    const userData = await request.json();
    const parsedData = userData.parse(userData);
    const updatedUser = await db
      .update(users)
      .set(parsedData)
      .where(eq(users.email, user_email))
      .execute();

    if (updatedUser.length > 0) {
      return NextResponse.json(updatedUser[0]);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { user_email } = params;
    const updatedUser = await db
      .update(users)
      .set({ isActive: true })
      .where(eq(users.email, user_email))
      .execute();

    if (deletedUser.length > 0) {
      return NextResponse.json(null, { status: 204 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
