import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const renderEntries = new Set([
  require.resolve("@react-email/render"),
  createRequire(require.resolve("resend")).resolve("@react-email/render"),
]);

for (const entry of renderEntries) {
  const renderer = createRequire(entry);
  const htmlToText = createRequire(renderer.resolve("html-to-text"));
  const main = htmlToText.resolve("deepmerge");
  const bundled = createRequire(main);
  for (const merge of [bundled("./cjs.js"), bundled("./umd.js")]) {
    const payload = JSON.parse('{"__proto__":{"isAdmin":true}}');
    const cases = [
      merge(Object.assign(Object.create(null), { safe: true }), payload),
      merge({ session: null }, { session: payload }).session,
      merge(payload, { safe: true }),
      merge({ list: [] }, { list: [payload] }).list[0],
    ];
    for (const result of cases) {
      assert.equal(Object.getPrototypeOf(result), Object.prototype);
      assert.equal(result.isAdmin, undefined);
      assert.equal(Object.hasOwn(result, "__proto__"), false);
    }
    assert.deepEqual(
      merge({ nested: { a: 1 }, list: [1] }, { nested: { b: 2 }, list: [2] }),
      {
        nested: { a: 1, b: 2 },
        list: [1, 2],
      },
    );
    assert.equal({}.isAdmin, undefined);
  }
  console.log(
    `Prototype-key regression checks passed for both bundles: ${main}`,
  );
}

const { toPlainText } = await import("@react-email/render");
assert.equal(
  toPlainText("<p>Hello <strong>there</strong>!</p>"),
  "Hello there!",
);
console.log("Email text rendering still works.");
