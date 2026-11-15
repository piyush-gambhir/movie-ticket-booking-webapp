import { z } from "zod";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/actions/user";
import { signInWithPasswordSchema } from "@/lib/zod/auth";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

import { db } from "@/lib/db";

import {
  users,
} from "@/lib/db/schema/users.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = signInWithPasswordSchema.parse({
            email: credentials.email,
            password: credentials.password,
          });

          const user = await getUserByEmail({ email });
          if (!user) {
            throw new Error("No user found");
          }

          if (!user.password) {
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await verifyPassword(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(error.issues[0].message);
          }
          throw new Error("Invalid credentials");
        }
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  secret: process.env.AUTH_SECRET,
});
