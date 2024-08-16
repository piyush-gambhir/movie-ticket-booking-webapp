import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";
import { userSchema } from "@/lib/db/schemas/user.schema";

export async function GET(request) {
  try {
    const { page = 1, limit = 10 } = request.query;
    const offset = (page - 1) * limit;
    const allUsers = await db.select().from(users);
    return NextResponse.json({
      data: allUsers.slice(offset, offset + limit),
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
