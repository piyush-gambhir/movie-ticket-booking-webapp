import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";

/**
 * Generates a UUID.
 *
 * @returns {string} The generated UUID.
 */

export function generateUUIDv1() {
  return uuidv1();
}

export function generateUUIDv3() {
  return uuidv3();
}

export function generateUUIDv4() {
  return uuidv4();
}

export function generateUUIDv5() {
  return uuidv5();
}
