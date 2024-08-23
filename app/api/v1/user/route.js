import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users.schema";

import { signUpWithPasswordSchema } from "@/lib/zod/auth";

import { hashPassword } from "@/lib/utils/saltAndHashPassword";

// export async function GET(request) {
//   try {
//     const { page = 1, limit = 10 } = request.query;
//     const offset = (page - 1) * limit;
//     const allUsers = await db.select().from(users);
//     const parsedUsers = allUsers.map((user) => selectUserSchema.parse(user));

//     return NextResponse.json({
//       data: parsedUsers.slice(offset, offset + limit),
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total_pages: Math.ceil(allUsers.length / limit),
//         total: allUsers.length,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

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
