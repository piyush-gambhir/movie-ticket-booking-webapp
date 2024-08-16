import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";
import { accounts } from "@/lib/db/schemas/accounts.schema";
import { sessions } from "@/lib/db/schemas/session.schema";
import { verificationTokens } from "@/lib/db/schemas/verificationTokens.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
});
