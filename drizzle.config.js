import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/*",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://movie-booking-web-app_owner:JsiWlTj5PG9M@ep-snowy-field-a5twi3ca.us-east-2.aws.neon.tech/movie-booking-web-app?sslmode=require",
  },
});
