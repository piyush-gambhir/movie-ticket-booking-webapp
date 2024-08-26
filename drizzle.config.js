import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema/*.schema.js",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: "postgresql://movie-ticket-booking_owner:diyhj8J5BwIL@ep-gentle-night-a5adzspm.us-east-2.aws.neon.tech/movie-ticket-booking?sslmode=require",
  },
  verbose: true,
  strict: true,
});
