import { z } from "zod";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import Facebook from "next-auth/providers/facebook";
// import ResendProvider from "next-auth/providers/resend";

import { getUserByEmail } from "@/actions/user";
import { signInWithPasswordSchema } from "@/lib/zod/auth";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

import { db } from "@/lib/db";

// import {
//   users,
//   accounts,
//   sessions,
//   verificationTokens,
//   authenticators,
// } from "@/lib/db/schema/users.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(
    db,
    // , {
    // User: users,
    // Account: accounts,
    // Session: sessions,
    // VerificationToken: verificationTokens,
    // Authenticator: authenticators,
    // }
  ),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            signInWithPasswordSchema.parse(credentials);

          const user = await getUserByEmail(email);

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }

          if (verifyPassword(password, user.password)) {
            throw new Error("Invalid credentials");
          }
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
    // Google,
    // Facebook,
    // ResendProvider({
    //   server: {
    //     host: process.env.RESEND_HOST,
    //     port: Number(process.env.RESEND_PORT),
    //     auth: {
    //       user: process.env.RESEND_USERNAME,
    //       pass: process.env.RESEND_API_KEY,
    //     },
    //   },
    //   async sendVerificationRequest({ identifier, url }) {
    //     try {
    //       await resend.emails.send({
    //         from: process.env.RESEND_EMAIL_FROM,
    //         to: [identifier],
    //         subject: `${siteConfig.name} magic link sign in`,
    //         react: MagicLinkEmail({ identifier, url }),
    //       });

    //       console.log("Verification email sent");
    //     } catch (error) {
    //       throw new Error("Failed to send verification email");
    //     }
    //   },
    // }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) token.role = user.role;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },

  secret: process.env.AUTH_SECRET,
});
