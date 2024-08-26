"use server";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/actions/user";

import { signIn, signOut } from "@/auth";

import {
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
} from "@/lib/zod/auth";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

export const logout = async () => {
  await signOut({
    callbackUrl: "/signin",
  });
};

export async function signUpWithPassword({ email, password, name }) {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse({
      name: name,
      email: email,
      password: password,
    });

    if (!validatedInput.success) {
      return { error: "Invalid fields!" };
    }
    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });

    if (existingUser) {
      return { error: "Email already in use!" };
    }
    const newUser = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user`,
      {
        method: "POST",
        body: JSON.stringify({
          name: validatedInput.data.name,
          email: validatedInput.data.email,
          password: validatedInput.data.password,
        }),
      },
    ).then((res) => res.json());

    // const emailSent = await resend.emails.send({
    //   from: env.RESEND_EMAIL_FROM,
    //   to: [validatedInput.data.email],
    //   subject: "Verify your email address",
    //   react: EmailVerificationEmail({
    //     email: validatedInput.data.email,
    //     emailVerificationToken,
    //   }),
    // });

    // return newUser && emailSent ? "success" : "error";

    // await signIn("credentials", {
    //   email: validatedInput.data.email,
    //   password: validatedInput.data.password,
    //   redirect: false,
    // });

    return newUser ? { success: true } : { error: "Error signing up!" };
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

export async function signInWithPassword({ email, password }) {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse({
      email: email,
      password: password,
    });

    if (!validatedInput.success) {
      return { error: "Invalid fields!" };
    }

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });

    if (!existingUser) {
      return { error: "User not found!" };
    }

    if (!existingUser.password) {
      return { error: "Incorrect provider!" };
    }

    // if (!existingUser.emailVerified) {
    //   return { error: "Email not verified!" };
    // }
    const isPasswordValid = await verifyPassword(
      validatedInput.data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return { error: "Invalid credentials!" };
    }
    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          throw error;
      }
    } else {
      throw new Error("Error signing in with password");
    }
  }
}

// export async function resetPassword(rawInput) {
//   try {
//     const validatedInput = passwordResetSchema.safeParse(rawInput);
//     if (!validatedInput.success) return "invalid-input";

//     const user = await handleGetUserByEmail({
//       email: validatedInput.data.email,
//     });
//     if (!user) return "not-found";

//     const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
//     const resetPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

//     const userUpdated = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         resetPasswordToken,
//         resetPasswordTokenExpiry,
//       },
//     });

//     const emailSent = await resend.emails.send({
//       from: process.env.RESEND_EMAIL_FROM,
//       to: [validatedInput.data.email],
//       subject: "Reset your password",
//       react: ResetPasswordEmail({
//         email: validatedInput.data.email,
//         resetPasswordToken,
//       }),
//     });

//     return userUpdated && emailSent ? "success" : "error";
//   } catch (error) {
//     console.error(error);
//     return "error";
//   }
// }

// export async function updatePassword(rawInput) {
//   try {
//     const validatedInput = passwordUpdateSchemaExtended.safeParse(rawInput);
//     if (
//       !validatedInput.success ||
//       validatedInput.data.password !== validatedInput.data.confirmPassword
//     )
//       return "invalid-input";

//     const user = await getUserByResetPasswordToken({
//       token: validatedInput.data.resetPasswordToken,
//     });
//     if (!user) return "not-found";

//     if (
//       !user.resetPasswordTokenExpiry ||
//       user.resetPasswordTokenExpiry < new Date()
//     )
//       return "expired";

//     const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10);

//     const userUpdated = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         passwordHash,
//         resetPasswordToken: null,
//         resetPasswordTokenExpiry: null,
//       },
//     });

//     return userUpdated ? "success" : "error";
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error updating password");
//   }
// }

// export async function linkOAuthAccount(rawInput) {
//   try {
//     const validatedInput = linkOAuthAccountSchema.safeParse(rawInput);
//     if (!validatedInput.success) return;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error linking OAuth account");
//   }
// }
