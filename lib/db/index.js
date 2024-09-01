import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DRIZZLE_DATABASE_URL;
const client = neon(connectionString);

export const db = drizzle(client, { schema: {}, logger: true });
