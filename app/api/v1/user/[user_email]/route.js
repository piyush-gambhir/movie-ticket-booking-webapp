import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users.schema";

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
        password: users.password,
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
