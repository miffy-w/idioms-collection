const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const res = {};
  args.forEach((a, i) => {
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq !== -1) {
        res[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        const key = a.slice(2);
        const next = args[i + 1];
        if (next && !next.startsWith('--')) {
          res[key] = next;
        } else {
          res[key] = true;
        }
      }
    }
  });
  return res;
}

function readFilesRec(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(readFilesRec(full));
    else if (e.isFile() && full.endsWith('.tsx')) files.push(full);
  }
  return files;
}

function extractDataObject(text) {
  // match export const DATA ... = { ... };
  const re = /export\s+const\s+DATA(?:\s*:\s*[\w\<\>\,\s\[\]]+)?\s*=\s*(\{[\s\S]*?\})\s*(?:;|$)/m;
  const m = text.match(re);
  if (!m) return null;
  return m[1];
}

function safeEvalObject(objText) {
  try {
    // Function will evaluate the object literal
    return new Function('return (' + objText + ')')();
  } catch (err) {
    try {
      // fallback to eval
      return eval('(' + objText + ')');
    } catch (err2) {
      return null;
    }
  }
}

function main() {
  const args = parseArgs();
  const dir = args.dir || args.d || 'en_US';

  const appDir = path.join(process.cwd(), 'src', 'app', dir);
  if (!fs.existsSync(appDir) || !fs.statSync(appDir).isDirectory()) {
    console.error('Directory not found:', appDir);
    process.exit(1);
  }

  const files = readFilesRec(appDir);
  const items = [];

  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    const objText = extractDataObject(text);
    if (!objText) continue;
    const obj = safeEvalObject(objText);
    if (!obj) {
      console.warn('Failed to parse DATA in', f);
      continue;
    }
    const picked = {
      id: obj.id,
      o: obj.original,
      om: obj.originalMeaning,
      t: obj.translation,
      tm: obj.translationMeaning,
    };
    items.push(picked);
  }

  items.sort((a, b) => a.id - b.id);    // sort by id
  const outPath = path.join(appDir, 'idiomList.json');
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
  console.log('Wrote', outPath, 'with', items.length, 'items');
}

if (require.main === module) main();
