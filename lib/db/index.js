import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const connectionString =
  "postgresql://movie-ticket-booking_owner:diyhj8J5BwIL@ep-gentle-night-a5adzspm.us-east-2.aws.neon.tech/movie-ticket-booking?sslmode=require";
const client = neon(connectionString);

export const db = drizzle(client, { schema: {}, logger: true });
