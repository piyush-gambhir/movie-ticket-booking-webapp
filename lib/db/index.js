import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  "postgresql://movie-booking-web-app_owner:JsiWlTj5PG9M@ep-snowy-field-a5twi3ca.us-east-2.aws.neon.tech/movie-booking-web-app?sslmode=require",
);

export const db = drizzle(sql);
