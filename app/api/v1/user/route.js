import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";

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
    const validatedInput = signUpWithPasswordSchema.safeParse(userData);
    console.log(validatedInput);
    const hashedPassword = await hashPassword(validatedInput.data.password);

    const user = await db
      .insert(users)
      .values({
        name: validatedInput.data.name,
        email: validatedInput.data.email,
        password: validatedInput.data.password,
      })
      .returning("*");
    console.log(user);
    return NextResponse.json({ message: "User successfully created." });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
