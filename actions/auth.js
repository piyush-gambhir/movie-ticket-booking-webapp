"use server";

import { handleGetUserByEmail } from "@/actions/user";

import { signIn } from "@/auth";

import {
  signInWithPasswordSchema,
  signUpWithPasswordSchema,
  linkOAuthAccountSchema,
} from "@/lib/zod/auth";

import { verifyPassword } from "@/lib/utils/saltAndHashPassword";

export async function signUpWithPassword({ formData }) {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse(formData);
    if (!validatedInput.success) return "invalid-input";

    const existingUser = await handleGetUserByEmail({
      email: validatedInput.data.email,
    });

    if (existingUser) return "exists";

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

    return newUser ? "success" : "error";
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

export async function signInWithPassword(rawInput) {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const existingUser = await handleGetUserByEmail({
      email: validatedInput.data.email,
    });
    if (!existingUser) return "not-registered";

    if (!existingUser.email || !existingUser.password)
      return "incorrect-provider";

    if (!existingUser.emailVerified) return "unverified-email";

    const passwordMatch = await verifyPassword({
      password: validatedInput.data.password,
      passwordHash: existingUser.password,
    });

    if (!passwordMatch) return "invalid-credentials";

    await signIn("credentials", {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirect: false,
    });

    return "success";
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "invalid-credentials";
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
