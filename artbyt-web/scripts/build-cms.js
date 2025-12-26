const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: [path.join(__dirname, "../src/cms/register.ts")],
    bundle: true,
    outfile: path.join(__dirname, "../public/admin/cms-preview.js"),
    platform: "browser",
    target: ["es2020"],
    format: "iife",
    external: ["decap-cms-app"],
    loader: {
      ".tsx": "tsx",
      ".ts": "ts",
    },
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    sourcemap: true,
  })
  .then(() => {
    console.log("✓ CMS preview bundle built successfully");
  })
  .catch((error) => {
    console.error("✗ CMS preview build failed:", error);
    process.exit(1);
  });
