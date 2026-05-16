const fs = require("fs");
const path = require("path");

function listBackendFiles(rootDir) {
  const out = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) {
        const name = entry.name;
        const ext = path.extname(name).toLowerCase();
        if (ext === ".js" || ext === ".json" || name === "package.json") out.push(full);
      }
    }
  }
  walk(rootDir);
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

function removeNonJSDocCommentsAndEmptyLines(js) {
  // State machine that removes:
  // - // line comments
  // - /* block comments (but keeps /** ... */ JSDoc blocks)
  let i = 0;
  const len = js.length;
  let out = [];

  let state = "code"; // code | sq | dq | bt
  let quote = "";

  while (i < len) {
    const ch = js[i];

    if (state === "code") {
      if (ch === "'" || ch === '"' || ch === "`") {
        state = ch === "'" ? "sq" : ch === '"' ? "dq" : "bt";
        quote = ch;
        out.push(ch);
        i++;
        continue;
      }

      if (ch === "/" && i + 1 < len) {
        if (js[i + 1] === "/") {
          i += 2;
          while (i < len && js[i] !== "\n") i++;
          continue;
        }
        if (js[i + 1] === "*") {
          const isJSDoc = i + 2 < len && js[i + 2] === "*";
          if (isJSDoc) {
            out.push("/**");
            i += 3;
            while (i < len) {
              if (js[i] === "*" && i + 1 < len && js[i + 1] === "/") {
                out.push("*/");
                i += 2;
                break;
              }
              out.push(js[i]);
              i++;
            }
            continue;
          }

          i += 2;
          while (i + 1 < len && !(js[i] === "*" && js[i + 1] === "/")) i++;
          if (i + 1 < len) i += 2;
          continue;
        }
      }

      out.push(ch);
      i++;
      continue;
    }

    if (state === "sq") {
      out.push(ch);
      if (ch === "\\") {
        if (i + 1 < len) {
          out.push(js[i + 1]);
          i += 2;
        } else i++;
        continue;
      }
      if (ch === quote) {
        state = "code";
        quote = "";
      }
      i++;
      continue;
    }

    if (state === "dq") {
      out.push(ch);
      if (ch === "\\") {
        if (i + 1 < len) {
          out.push(js[i + 1]);
          i += 2;
        } else i++;
        continue;
      }
      if (ch === quote) {
        state = "code";
        quote = "";
      }
      i++;
      continue;
    }

    if (state === "bt") {
      out.push(ch);
      if (ch === "\\") {
        if (i + 1 < len) {
          out.push(js[i + 1]);
          i += 2;
        } else i++;
        continue;
      }
      if (ch === quote) {
        state = "code";
        quote = "";
      }
      i++;
      continue;
    }
  }

  const cleaned = out.join("");
  const lines = cleaned.split(/\r?\n/);
  const kept = lines.filter((ln) => ln.trim() !== "");
  return kept.join("\n");
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const cloudbaseDir = path.join(repoRoot, "cloudbase");
  const outDir = path.join(repoRoot, "exports");
  const outPath = path.join(outDir, "backend_all_logic.txt");

  if (!fs.existsSync(cloudbaseDir)) {
    console.error("cloudbase/ not found:", cloudbaseDir);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const files = listBackendFiles(cloudbaseDir);

  let result = "";
  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const ext = path.extname(filePath).toLowerCase();
    const cleaned =
      ext === ".js"
        ? removeNonJSDocCommentsAndEmptyLines(raw)
        : raw.split(/\r?\n/).filter((ln) => ln.trim() !== "").join("\n");
    if (!cleaned.trim()) continue;
    if (result.length > 0 && !result.endsWith("\n")) result += "\n";
    result += cleaned;
  }

  fs.writeFileSync(outPath, result, "utf8");
  const lineCount = result.length ? result.split(/\r?\n/).length : 0;
  console.log(JSON.stringify({ fileCount: files.length, outPath, lineCount }, null, 2));
}

main();

