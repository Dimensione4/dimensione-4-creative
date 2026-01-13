/* scripts/generate-build-info.cjs */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function safeExec(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

const env = process.env.VITE_APP_ENV || process.env.NODE_ENV || "unknown";

const commitSha =
  process.env.GITHUB_SHA ||
  safeExec("git rev-parse HEAD") ||
  "unknown";

const commitShort =
  process.env.GITHUB_SHA
    ? process.env.GITHUB_SHA.substring(0, 7)
    : safeExec("git rev-parse --short HEAD") || "unknown";

const branch =
  process.env.GITHUB_REF_NAME ||
  safeExec("git rev-parse --abbrev-ref HEAD") ||
  "unknown";

const buildInfo = {
  env,
  branch,
  commitSha,
  commitShort,
  buildTime: new Date().toISOString(),
};

const distPath = path.resolve(process.cwd(), "dist");
const outFile = path.resolve(distPath, "build-info.json");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(outFile, JSON.stringify(buildInfo, null, 2), "utf-8");

console.log("[build-info] Written:", outFile);
console.log(buildInfo);