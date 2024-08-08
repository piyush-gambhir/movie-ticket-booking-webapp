import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";

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
