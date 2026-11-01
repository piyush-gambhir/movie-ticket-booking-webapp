import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const cwd = path.resolve(process.argv[2] || ".");
const manager = process.argv[3] || "pnpm";
assert.ok(["npm", "pnpm"].includes(manager));
const advisoryId = "GHSA-g3hv-75wg-m249";
const legacyPackageIntegrity =
  "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==";
const legacySourceSha256 =
  "746849f267c4868a53729225bd85c7dccd387712136fb305fcc0a3eadd4a3d9d";
// Upstream identifies the 10.2.6 preprocessing code; reviewed database ranges also flag v3.
// https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249
const installedManager = existsSync(path.join(cwd, "node_modules/.pnpm"))
  ? "pnpm"
  : "npm";
const args =
  installedManager === "pnpm"
    ? ["list", "minimatch", "--depth", "Infinity", "--json"]
    : ["ls", "minimatch", "--all", "--long", "--json"];
const listing = spawnSync(installedManager, args, {
  cwd,
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});
assert.equal(listing.status, 0, "Installed dependency inventory failed");
assert.ok(listing.stdout, "Installed dependency inventory is unavailable");
const packages = new Map();
function collect(node) {
  if (Array.isArray(node)) return node.forEach(collect);
  if (!node || typeof node !== "object") return;
  for (const group of [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
  ]) {
    for (const [name, dependency] of Object.entries(node[group] || {})) {
      if (name === "minimatch") {
        assert.ok(
          dependency.path,
          "A minimatch dependency has no installed path",
        );
        packages.set(dependency.path, dependency.version);
      }
      collect(dependency);
    }
  }
}
collect(JSON.parse(listing.stdout));
assert.ok(packages.size, "No installed minimatch packages were found");
function isPatched(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return major > 11 || (major === 11 && (minor > 0 || patch >= 1));
}
for (const [directory] of packages) {
  const filename = path.join(directory, "package.json");
  const metadata = JSON.parse(readFileSync(filename, "utf8"));
  if (isPatched(metadata.version)) continue;
  assert.equal(
    metadata.version,
    "3.1.5",
    "An unmitigated minimatch version is installed",
  );
  const entry = path.resolve(directory, metadata.main || "index.js");
  const source = readFileSync(entry, "utf8");
  assert.equal(
    createHash("sha256").update(source).digest("hex"),
    legacySourceSha256,
    "Legacy source differs from the reviewed artifact",
  );
  assert.doesNotMatch(
    source,
    /firstPhasePreProcess|secondPhasePreProcess|optimizationLevel/,
  );
  const minimatch = createRequire(filename)(entry);
  const matcher = new minimatch.Minimatch("a/**/../b/c/".repeat(32), {
    optimizationLevel: 2,
  });
  assert.equal(
    matcher.globParts.length,
    1,
    "Legacy matching unexpectedly expands glob parts",
  );
}
const npmLock = path.join(cwd, "package-lock.json");
if (existsSync(npmLock)) {
  const lock = JSON.parse(readFileSync(npmLock, "utf8"));
  for (const [name, pkg] of Object.entries(lock.packages || {})) {
    if (name.endsWith("/minimatch")) {
      assert.ok(
        pkg.version === "3.1.5" || isPatched(pkg.version),
        "Alternate npm lock contains an unmitigated minimatch",
      );
      if (pkg.version === "3.1.5")
        assert.equal(
          pkg.integrity,
          legacyPackageIntegrity,
          "Alternate npm lock uses an unreviewed legacy artifact",
        );
    }
  }
}
const audit = spawnSync(manager, ["audit", "--audit-level", "low", "--json"], {
  cwd,
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});
assert.ok(audit.stdout, "Dependency audit did not produce JSON");
const report = JSON.parse(audit.stdout);
assert.ok(!report.error, "Dependency audit request failed");
const findings =
  manager === "pnpm"
    ? Object.values(report.advisories || {})
    : Object.values(report.vulnerabilities || {})
        .flatMap((item) => item.via || [])
        .filter((item) => typeof item === "object");
const unexpected = findings.filter(
  (finding) => !(finding.url || "").endsWith("/" + advisoryId),
);
if (unexpected.length) {
  console.error(JSON.stringify(unexpected, null, 2));
  process.exit(1);
}
assert.ok(
  audit.status === 0 || findings.length > 0,
  "Audit failed without classifiable findings",
);
console.log(
  "Audited all dependencies. Legacy minimatch 3.1.5 lacks the affected preprocessing code; newer installed and locked copies are patched.",
);
if (findings.length)
  console.log(
    `Classified only ${advisoryId} on the guarded legacy version; every other reported advisory remains blocking.`,
  );
