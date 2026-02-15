import fs from "fs/promises";
import path from "path";
import vm from "vm";

const ROOT = path.join(process.cwd(), "src", "app", "en_US", "xiehouyu");

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.isFile() && e.name === "page.tsx") files.push(full);
  }
  return files;
}

function findMatchingBrace(text: string, start: number) {
  let i = start;
  const len = text.length;
  let depth = 0;
  let inString: string | null = null;
  let escaped = false;
  for (; i < len; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === inString) inString = null;
      else if (inString === "`" && ch === "$" && text[i + 1] === "{") {
        // enter ${ ... } inside template literal
        const match = findMatchingBrace(text, i + 2);
        if (match === -1) return -1;
        i = match; // will continue
      }
      continue;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") {
        inString = ch;
        continue;
      }
      if (ch === "{") {
        depth++;
        continue;
      }
      if (ch === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return -1;
}

async function processFile(filePath: string) {
  let content = await fs.readFile(filePath, "utf8");

  if (/import\s+DATA\s+from\s+['"]\.\/data\.json['"]/m.test(content)) {
    console.log("Skipping (already imports data.json):", filePath);
    return;
  }

  const constMatch = /(?:export\s+)?const\s+DATA(?:\s*:[^=]+)?\s*=/.exec(content);
  if (!constMatch) {
    console.log("No DATA constant found in:", filePath);
    return;
  }

  const startIdx = constMatch.index;
  const afterEqIdx = content.indexOf("=", startIdx);
  const braceStart = content.indexOf("{", afterEqIdx);
  if (braceStart === -1) {
    console.log("Couldn't find object start in:", filePath);
    return;
  }

  const braceEnd = findMatchingBrace(content, braceStart);
  if (braceEnd === -1) {
    console.log("Couldn't match braces in:", filePath);
    return;
  }

  const objectText = content.slice(braceStart, braceEnd + 1);

  let dataObj: any;
  try {
    // Evaluate the object literal in a sandboxed vm to get a JS value
    const script = "(" + objectText + ")";
    dataObj = vm.runInNewContext(script, {}, { timeout: 1000 });
  } catch (err) {
    console.error("Failed to evaluate DATA object in:", filePath, err);
    return;
  }

  const dir = path.dirname(filePath);
  const outPath = path.join(dir, "data.json");

  try {
    await fs.writeFile(outPath, JSON.stringify(dataObj, null, 2), "utf8");
    console.log("Wrote:", outPath);
  } catch (err) {
    console.error("Failed to write data.json for:", filePath, err);
    return;
  }

  // Remove the const DATA = { ... }; (including trailing semicolon and nearby blank lines)
  let removeEnd = braceEnd + 1;
  // consume following semicolon and whitespace/newlines
  while (removeEnd < content.length && /[ \t;\r\n]/.test(content[removeEnd])) removeEnd++;

  const before = content.slice(0, startIdx);
  const after = content.slice(removeEnd);

  // Insert import after the last import statement or at top
  const importLine = "import DATA from './data.json';\n";
  const importRegex = /^import .*;.*$/gm;
  let lastImportMatch: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = importRegex.exec(content))) lastImportMatch = m;

  let newContent: string;
  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;
    newContent = content.slice(0, insertPos) + "\n" + importLine + content.slice(insertPos);
    // now remove the original const DATA from newContent
    const snippet = content.slice(startIdx, removeEnd);
    newContent = newContent.replace(snippet, "");
  } else {
    // no imports, put import at top
    newContent = importLine + before + after;
  }

  await fs.writeFile(filePath, newContent, "utf8");
  console.log("Updated:", filePath);
}

async function main() {
  try {
    const files = await walk(ROOT);
    if (files.length === 0) {
      console.log("No page.tsx files found under:", ROOT);
      return;
    }
    for (const f of files) {
      try {
        await processFile(f);
      } catch (e) {
        console.error("Error processing", f, e);
      }
    }
    console.log("Done.");
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

main();
