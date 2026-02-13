const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dataPath = path.join(repoRoot, 'src', 'data', 'xiehouyu.ts');
const outDir = path.join(repoRoot, 'src', 'app', 'en_US');

let src = fs.readFileSync(dataPath, 'utf8');

// remove the interface block
src = src.replace(/export interface[\s\S]*?\n}\n\n/, '');

// locate the array assignment
const m = src.match(/export const xiehouyuData[\s\S]*?=\s*(\[[\s\S]*?\])\s*;/m);
if (!m) {
  console.error('Could not find xiehouyuData array in file');
  process.exit(1);
}

const arrayText = m[1];

// convert TypeScript-ish object array into runnable JS
// wrap into a module and eval safely
const wrapped = 'const xiehouyuData = ' + arrayText + ';\nmodule.exports = xiehouyuData;';

let data;
try {
  // Use Function to evaluate in isolated scope
  const fn = new Function(wrapped + '\nreturn module.exports;');
  data = fn();
} catch (err) {
  // fallback: attempt to replace single-quotes with double quotes and parse JSON
  try {
    const jsonish = arrayText.replace(/(\r\n|\n)/g, '\\n');
    data = eval('(' + arrayText + ')');
  } catch (err2) {
    console.error('Failed to evaluate data:', err, err2);
    process.exit(1);
  }
}

// ensure output dir exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// start numbering at 3, read from the 3rd item (index 2)
let startIndex = 2; // zero-based
let fileNumber = 3;

for (let i = startIndex; i < data.length; i++, fileNumber++) {
  const item = data[i];

  const original = item.chinese || '';
  const originalMeaning = item.chineseMeaning || '';
  const translation = item.english || '';
  const translationMeaning = item.englishMeaning || '';
  const imageUrl = item.imageUrl || '';
  const source = item.source || '';

  // split meaning and usage if possible
  let meaning = item.meaning || '';
  let usage = '';
  const splitToken = '\\n\\nUsage:';
  if (meaning.includes('\n\nUsage:')) {
    const parts = meaning.split('\n\nUsage:');
    meaning = parts[0].trim();
    usage = parts[1].trim();
  } else if (meaning.includes('Usage:')) {
    const parts = meaning.split('Usage:');
    meaning = parts[0].trim();
    usage = parts[1].trim();
  }

  const outFolder = path.join(outDir, String(fileNumber));
  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

  const pagePath = path.join(outFolder, 'page.tsx');

  const content = `import IdiomCard from "@/components/IdiomCard";
import { IdiomItem } from "@/types";

const DATA: IdiomItem = {
  id: ${fileNumber},
  original: ${JSON.stringify(original)},
  originalMeaning: ${JSON.stringify(originalMeaning)},
  originalCountry: "China",
  translation: ${JSON.stringify(translation)},
  translationMeaning: ${JSON.stringify(translationMeaning)},
  imageUrl: ${JSON.stringify(imageUrl)},
  source: ${JSON.stringify(source)},
  meaning: ${JSON.stringify(meaning)},
  usage: ${JSON.stringify(usage)},
}

export default function Home() {
  return (
    <IdiomCard
      data={DATA}
    />
  );
}
`;

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Wrote', pagePath);
}

console.log('Done. Generated files from index 3 to', fileNumber - 1);
