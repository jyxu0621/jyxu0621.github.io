import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const resume = read("src/data/resume-data.ts");
const nextConfig = read("next.config.js");
const layout = read("src/app/layout.tsx");
const page = read("src/app/page.tsx");
const structuredData = read("src/lib/structured-data.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("public/robots.txt");

for (const expected of [
  'name: "Jason Xu"',
  'initials: "JX"',
  'school: "Beijing Jiaotong University"',
  'url: "https://github.com/jyxu0621"',
  'url: "https://jyxu0621.github.io/blog/"',
]) {
  assert.ok(resume.includes(expected), `Missing homepage data: ${expected}`);
}

for (const forbidden of [
  "Bartosz Jarocki",
  "bartosz.jarocki",
  "Wroc",
  "Motion",
  "Film.io",
  "Parabol",
  "Clevertech",
  "Nokia",
  "Monito",
  "43frames",
]) {
  assert.ok(!resume.includes(forbidden), `Private/upstream data remains: ${forbidden}`);
}

assert.match(nextConfig, /output:\s*["']export["']/, "Next.js static export is not enabled");
assert.match(nextConfig, /unoptimized:\s*true/, "Static image export is not enabled");
assert.ok(
  existsSync(new URL("../.github/workflows/deploy-pages.yml", import.meta.url)),
  "GitHub Pages workflow is missing",
);
assert.ok(
  !existsSync(new URL("../src/app/opengraph-image.tsx", import.meta.url)),
  "Dynamic Open Graph route prevents a fully static export",
);

for (const [path, content] of [
  ["layout", layout],
  ["page", page],
  ["structured data", structuredData],
  ["sitemap", sitemap],
  ["robots", robots],
]) {
  assert.ok(!content.includes("cv.jarocki.me"), `Upstream URL remains in ${path}`);
  assert.ok(!content.includes("BartoszJarocki"), `Upstream identity remains in ${path}`);
}

assert.ok(
  robots.includes("Sitemap: https://jyxu0621.github.io/sitemap.xml"),
  "robots.txt does not reference the public sitemap",
);

assert.match(
  sitemap,
  /dynamic\s*=\s*["']force-static["']/,
  "Sitemap is not explicitly static for Next.js export",
);

console.log("Homepage source verification passed.");
