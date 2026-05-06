const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const exts = [".tsx", ".ts", ".jsx", ".js"];

const tokenMap = [
  // hex to token class replacements (bg, text, border)
  {
    regex: /bg-\[#([0-9A-Fa-f]{3,6})\]/g,
    replace: (m, hex) =>
      hex.toUpperCase() === "3737C1"
        ? "bg-primary"
        : hex.toUpperCase() === "00C89C"
          ? "bg-secondary"
          : m,
  },
  {
    regex: /text-\[#([0-9A-Fa-f]{3,6})\]/g,
    replace: (m, hex) =>
      hex.toUpperCase() === "3737C1"
        ? "text-primary"
        : hex.toUpperCase() === "00C89C"
          ? "text-secondary"
          : hex.toUpperCase() === "0F172B"
            ? "text-text-heading"
            : hex.toUpperCase() === "62748E"
              ? "text-muted-foreground"
              : m,
  },
  {
    regex: /border-\[#([0-9A-Fa-f]{3,6})\]/g,
    replace: (m, hex) =>
      hex.toUpperCase() === "F1F5F9"
        ? "border-border"
        : hex.toUpperCase() === "E2E8F0"
          ? "border-muted"
          : hex.toUpperCase() === "00C89C"
            ? "border-secondary"
            : m,
  },
  // direct hex usages in class strings
  { regex: /[#]3737C1/g, replace: "var(--primary)" },
  { regex: /[#]00C89C/g, replace: "var(--secondary)" },
  { regex: /[#]0F172B/g, replace: "var(--text-heading)" },
  { regex: /[#]62748E/g, replace: "var(--text-muted)" },
  { regex: /[#]F1F5F9/g, replace: "var(--card-border)" },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;
  tokenMap.forEach(({ regex, replace }) => {
    content = content.replace(regex, replace);
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Updated", filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (exts.includes(path.extname(entry.name))) {
      processFile(fullPath);
    }
  });
}

walk(projectRoot);
console.log("Color token replacement completed.");
