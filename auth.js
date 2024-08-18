import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { z } from "zod";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";
import { accounts } from "@/lib/db/schemas/accounts.schema";
import { sessions } from "@/lib/db/schemas/session.schema";
import { verificationTokens } from "@/lib/db/schemas/verificationTokens.schema";

import { signInSchema } from "@/lib/zod";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          let user = null;
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(credentials.password);

          // logic to verify if the user exists
          user = await db("users").select("*").where({ email }).first();

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) throw new Error("Invalid credentials.");

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message);
          }
          throw new Error("Invalid credentials");
        }
      },
    }),
    Google,
    Facebook,
  ],
});
