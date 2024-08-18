"use server";

export async function signUpWithPassword(rawInput) {
  try {
    const validatedInput = signUpWithPasswordSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });
    if (existingUser) return "exists";

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    const newUser = await prisma.user.create({
      data: {
        email: validatedInput.data.email,
        passwordHash,
        emailVerificationToken,
      },
    });

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    });

    return newUser && emailSent ? "success" : "error";
  } catch (error) {
    console.error(error);
    throw new Error("Error signing up with password");
  }
}

async function signInWithPassword(rawInput) {
  try {
    const validatedInput = signInWithPasswordSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const existingUser = await getUserByEmail({
      email: validatedInput.data.email,
    });
    if (!existingUser) return "not-registered";

    if (!existingUser.email || !existingUser.passwordHash)
      return "incorrect-provider";

    if (!existingUser.emailVerified) return "unverified-email";

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

async function resetPassword(rawInput) {
  try {
    const validatedInput = passwordResetSchema.safeParse(rawInput);
    if (!validatedInput.success) return "invalid-input";

    const user = await getUserByEmail({ email: validatedInput.data.email });
    if (!user) return "not-found";

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const resetPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiry,
      },
    });

    const emailSent = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Reset your password",
      react: ResetPasswordEmail({
        email: validatedInput.data.email,
        resetPasswordToken,
      }),
    });

    return userUpdated && emailSent ? "success" : "error";
  } catch (error) {
    console.error(error);
    return "error";
  }
}

async function updatePassword(rawInput) {
  try {
    const validatedInput = passwordUpdateSchemaExtended.safeParse(rawInput);
    if (
      !validatedInput.success ||
      validatedInput.data.password !== validatedInput.data.confirmPassword
    )
      return "invalid-input";

    const user = await getUserByResetPasswordToken({
      token: validatedInput.data.resetPasswordToken,
    });
    if (!user) return "not-found";

    if (
      !user.resetPasswordTokenExpiry ||
      user.resetPasswordTokenExpiry < new Date()
    )
      return "expired";

    const passwordHash = await bcryptjs.hash(validatedInput.data.password, 10);

    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    return userUpdated ? "success" : "error";
  } catch (error) {
    console.error(error);
    throw new Error("Error updating password");
  }
}

async function linkOAuthAccount(rawInput) {
  try {
    const validatedInput = linkOAuthAccountSchema.safeParse(rawInput);
    if (!validatedInput.success) return;

    await prisma.user.update({
      where: { id: validatedInput.data.userId },
      data: {
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error linking OAuth account");
  }
}
