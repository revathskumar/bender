import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  outdir: "dist/",
  bundle: true,
  // target: "firefox60", // Since GJS 1.53.90
  // target: "firefox68", // Since GJS 1.63.90
  // target: "firefox78", // Since GJS 1.65.90
  target: "firefox102", // Since GJS 1.71.1
  format: "esm",
  external: ["gi://*"],
  sourcemap: true,
});
