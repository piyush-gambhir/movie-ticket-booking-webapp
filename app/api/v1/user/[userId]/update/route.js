import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const userData = await request.json();
    const parsedData = userUpdateSchema.parse(userData);
    const updatedUser = await db
      .update(users)
      .set(parsedData)
      .where(users.id.eq(id))
      .returning("*");
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
