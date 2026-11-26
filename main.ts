// Entry program for the news-image-20261125 bounty (Node 22, stdlib only).
//
// The entry is a single picture: a front page summing up Wednesday
// 25 November 2026. It ships in this repository as entry.png, and this
// program's whole job is to place it in the output directory under that
// same name. MAKEFUN_OUTPUT_DIR says where the grader wants it; /output
// is the fallback when the variable is absent.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(repoDir, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy landed whole: a truncated entry image fails the gate.
const { size } = statSync(target);
if (size !== statSync(source).size) {
  throw new Error(`copy mismatch: ${size} bytes written, source is ${statSync(source).size}`);
}
console.log(`entry.png published: ${size} bytes -> ${target}`);
