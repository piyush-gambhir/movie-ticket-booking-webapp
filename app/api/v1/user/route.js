import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users.schema";

import { signUpWithPasswordSchema } from "@/lib/zod/auth";

import { hashPassword } from "@/lib/utils/saltAndHashPassword";

import { getServerSession } from "@/lib/getServerSession";

export async function POST(request) {
  try {
    const userData = await request.json();
    const validatedInput = signUpWithPasswordSchema.parse(userData);
    const hashedPassword = await hashPassword({
      password: validatedInput.password,
    });

    const userExists = await db
      .select({
        email: users.email,
      })
      .from(users)
      .where(eq(users.email, validatedInput.email))
      .execute();

    if (userExists.length > 0) {
      return NextResponse.json(
        { message: "User with that email already exists." },
        { status: 400 },
      );
    }
    await db.insert(users).values({
      name: validatedInput.name,
      email: validatedInput.email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User successfully created." });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!getServerSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
  if (!getServerSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
