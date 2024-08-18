"use server";
export async function getServerSession() {
  const session = await auth();
  if (!session.user) return null;
  return session;
}
