import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await users.select().from(users).where(users.id.eq(id));
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

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deletedUser = await db
      .deleteFrom(users)
      .where(users.id.eq(id))
      .returning("*");
    if (deletedUser.length > 0) {
      return NextResponse.json(null, { status: 204 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
