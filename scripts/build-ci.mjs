import { spawnSync } from "node:child_process";

// Synthetic build fixtures only. This command never supplies production credentials.
const buildEnv = {
  AUTH_SECRET: "ci-build-only-not-a-production-secret",
  AUTH_GOOGLE_ID: "ci-build-only-google-client",
  AUTH_GOOGLE_SECRET: "ci-build-only-google-secret",
  RESEND_API_KEY: "re_ci_build_only_not_a_real_key",
  DRIZZLE_DATABASE_URL: "postgresql://ci:ci@127.0.0.1:5432/ci_build",
  TMDB_API_KEY: "ci-build-only-not-a-real-key",
  TYPESENSE_HOST: "127.0.0.1",
  TYPESENSE_PORT: "8108",
  TYPESENSE_PROTOCOL: "http",
  TYPESENSE_API_KEY: "ci-build-only-not-a-real-key",
  NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3001",
  GOOGLE_TAG_MANAGER_ID: "GTM-CI-BUILD",
};

const env = { ...process.env, ...buildEnv };
delete env.SKIP_ENV_VALIDATION;
const result = spawnSync("pnpm", ["run", "build", ...process.argv.slice(2)], {
  env,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
