import bcrypt from "bcryptjs";

const SALT_ROUNDS = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

/**
 * Hash a password with a salt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */

export async function hashPassword({ password }) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} plainPassword - The plain text password to check
 * @param {string} hashedPassword - The hashed password to compare with
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise
 */
export async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
