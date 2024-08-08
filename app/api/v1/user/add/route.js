import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";
import { userSchema } from "@/lib/db/schemas/user.schema";

export async function POST(request) {
  try {
    const userData = await request.json();
    const parsedData = userSchema.parse(userData);
    const newUser = await db.insert(users).values(parsedData).returning("*");
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
