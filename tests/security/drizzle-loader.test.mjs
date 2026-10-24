import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  symlinkSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const kit = realpathSync(path.join(root, "node_modules/drizzle-kit"));
const binary = path.join(kit, "bin.cjs");
const fromKit = createRequire(path.join(kit, "package.json"));

test("the exact Drizzle CLI uses bundled tsx instead of the unused legacy loader", () => {
  assert.equal(
    JSON.parse(readFileSync(path.join(kit, "package.json"))).version,
    "0.31.11",
  );
  assert.equal(
    createHash("sha256").update(readFileSync(binary)).digest("hex"),
    "b4165b8d47e66b2279e9c8f835748fdc2e56e0a54d3ee191896af51ce95d77e1",
  );
  for (const file of readdirSync(kit).filter((name) =>
    /\.(?:cjs|mjs|js)$/.test(name),
  )) {
    assert.doesNotMatch(
      readFileSync(path.join(kit, file), "utf8"),
      /esbuild-kit|esm-loader/,
      file,
    );
  }
  assert.match(readFileSync(binary, "utf8"), /tsx\.register\(\)/);
  assert.throws(() => fromKit.resolve("@esbuild-kit/esm-loader"), {
    code: "MODULE_NOT_FOUND",
  });
  assert.ok(fromKit.resolve("tsx"));
  assert.match(fromKit("esbuild").version, /^0\.25\./);
});

test("offline generation retains TypeScript enum and schema-loader behavior", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "drizzle-security-"));
  try {
    const config = path.join(temporary, "drizzle.config.cjs");
    writeFileSync(
      config,
      "module.exports=" +
        JSON.stringify({
          schema: path.join(root, "tests/security/fixtures/schema.ts"),
          out: path.join(temporary, "migrations"),
          dialect: "postgresql",
        }),
    );
    const env = { ...process.env };
    const run = spawnSync(
      process.execPath,
      [binary, "generate", "--config", config],
      { cwd: root, env, encoding: "utf8", timeout: 30_000 },
    );
    assert.equal(run.status, 0, run.stdout + run.stderr);
    const sql = readdirSync(path.join(temporary, "migrations")).filter((file) =>
      file.endsWith(".sql"),
    );
    assert.equal(sql.length, 1, run.stdout + run.stderr);
    assert.equal(
      createHash("sha256")
        .update(readFileSync(path.join(temporary, "migrations", sql[0])))
        .digest("hex"),
      "4cbff2d7322bd63485a72c36954030c4206b3a68c32d33fd8c5d13d94765fc45",
    );
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

// Exercise the repository's real default config without loader environment workarounds.
test("the default Drizzle command resolves application imports and emits reservation SQL", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "drizzle-default-"));
  try {
    for (const name of ["package.json", "drizzle.config.js", "envConfig.js"]) {
      cpSync(path.join(root, name), path.join(temporary, name));
    }
    cpSync(
      path.join(root, "lib/db/schema"),
      path.join(temporary, "lib/db/schema"),
      { recursive: true },
    );
    symlinkSync(
      path.join(root, "node_modules"),
      path.join(temporary, "node_modules"),
      process.platform === "win32" ? "junction" : "dir",
    );
    const env = {
      ...process.env,
      DRIZZLE_DATABASE_URL: "postgresql://fixture:fixture@127.0.0.1:1/fixture",
    };
    delete env.TSX_TSCONFIG_PATH;
    const run = spawnSync(process.execPath, [binary, "generate"], {
      cwd: temporary,
      env,
      encoding: "utf8",
      timeout: 30_000,
    });
    assert.equal(run.status, 0, run.stdout + run.stderr);
    const migrations = path.join(temporary, "lib/db/migrations");
    assert.ok(existsSync(migrations), run.stdout + run.stderr);
    const sqlFiles = readdirSync(migrations).filter((file) =>
      file.endsWith(".sql"),
    );
    assert.equal(sqlFiles.length, 1, run.stdout + run.stderr);
    const sql = readFileSync(path.join(migrations, sqlFiles[0]), "utf8");
    assert.match(sql, /CREATE TABLE "reservation"/);
    assert.match(sql, /REFERENCES "public"\."user"/);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
