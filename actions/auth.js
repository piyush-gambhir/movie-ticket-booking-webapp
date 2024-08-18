import { signIn } from "@/auth";
import SignupForm from "@/components/SignUpForm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/users.schema";
import { customUserSchema } from "@/lib/db/schemas/users.schema";

import { hashPassword } from "@/lib/utils/saltAndHashPassword";

export async function SignUpAction(formData) {
  const validatedFields = customUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(users.email.eq(email))
      .limit(1)
      .execute();

    if (existingUser.length > 0) {
      return {
        errors: {
          email: "Email is already in use",
        },
      };
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user",
      })
      .returning("*")
      .execute();

    await signIn({
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      errors: {
        general:
          "There was an error creating the user. Please try again later.",
      },
    };
  }
}
