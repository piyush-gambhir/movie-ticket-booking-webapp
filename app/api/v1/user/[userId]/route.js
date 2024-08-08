export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await drizzleClient
      .select()
      .from(users)
      .where(users.id.eq(id));
    if (user.length > 0) {
      return NextResponse.json(user[0]);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
