import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";
import { z } from "zod";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users.schema";

export async function GET(request, { params }) {
  try {
    const { userEmail } = params;

    if (z.string().email().safeParse(userEmail).success === false) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        phone: users.phone,
        dateOfBirth: users.dateOfBirth,
        role: users.role,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, userEmail))
      .execute();
    if (user.length > 0) {
      return NextResponse.json(user[0], {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
