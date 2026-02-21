/**
 * 分级语料词频数据：从 CSV 解析，按级别分组
 * 数据源：public/corpus/graded_vocab.csv
 */

/** 拼音数字声调转声调符号：1→̄ 2→́ 3→̌ 4→̀，按主元音标注 */
const TONE_MARKS: Record<string, [string, string, string, string]> = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
  v: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
};

/** 单音节加声调：body 为韵母部分，tone 1–4，返回带声调的主元音字符 */
function addToneToSyllable(body: string, tone: number): string {
  if (tone < 1 || tone > 4) return body;
  const toneIdx = tone - 1;
  const lower = body.toLowerCase();
  let pos = -1;
  let key: string = '';
  if (lower.includes('a')) {
    pos = lower.lastIndexOf('a');
    key = 'a';
  } else if (lower.includes('o')) {
    pos = lower.lastIndexOf('o');
    key = 'o';
  } else if (lower.includes('e')) {
    pos = lower.lastIndexOf('e');
    key = 'e';
  } else if ((lower.includes('u') || lower.includes('v')) && lower.includes('i')) {
    const uPos = Math.max(lower.lastIndexOf('u'), lower.lastIndexOf('v'));
    pos = uPos;
    key = lower[pos] === 'v' ? 'v' : 'u';
  } else if (lower.includes('i')) {
    pos = lower.lastIndexOf('i');
    key = 'i';
  } else if (lower.includes('u') || lower.includes('v')) {
    pos = lower.lastIndexOf('u') >= 0 ? lower.lastIndexOf('u') : lower.lastIndexOf('v');
    key = lower[pos] === 'v' ? 'v' : 'u';
  }
  if (pos < 0 || !TONE_MARKS[key]) return body;
  const replacement = TONE_MARKS[key][toneIdx];
  return body.slice(0, pos) + replacement + body.slice(pos + 1);
}

/** 将 "zhi4 liao2" 转为 "zhì liáo" */
export function pinyinNumberToToneMarks(pinyin: string): string {
  return pinyin
    .trim()
    .split(/\s+/)
    .map((syl) => {
      const m = syl.match(/^(.+?)([1-5])$/);
      if (!m) return syl;
      const body = m[1];
      const tone = parseInt(m[2], 10);
      if (tone === 5) return body;
      return addToneToSyllable(body, tone);
    })
    .join(' ');
}

export interface GradedVocabRow {
  级别: string;
  词: string;
  读音: string;
  频次: string;
  释义: string;
  用法例句: string;
}

/** 语料表格「词」列展示用：去掉英文字母，只保留中文等非拉丁字符 */
export function displayWord(word: string): string {
  const stripped = word.replace(/[A-Za-z]/g, '').trim();
  return stripped || word;
}

/** 判断「词」是否为英文（无中文）：无 CJK 字符则视为英文，表格中不展示 */
const CJK_REG = /\p{Script=Han}/u;
export function isWordEnglish(word: string): boolean {
  const t = (word ?? '').trim();
  if (!t) return true;
  return !CJK_REG.test(t);
}

/** 解析 CSV 全文（支持双引号内逗号与换行） */
function parseCSVRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  while (i < csvText.length) {
    const row: string[] = [];
    while (i < csvText.length) {
      let field = '';
      const ch = csvText[i];
      if (ch === '"') {
        i++;
        while (i < csvText.length) {
          if (csvText[i] === '"' && csvText[i + 1] === '"') {
            field += '"';
            i += 2;
            continue;
          }
          if (csvText[i] === '"') break;
          field += csvText[i++];
        }
        if (csvText[i] === '"') i++;
      } else {
        while (i < csvText.length && csvText[i] !== ',' && csvText[i] !== '\n' && csvText[i] !== '\r') {
          field += csvText[i++];
        }
      }
      row.push(field.trim());
      if (csvText[i] === ',') {
        i++;
        continue;
      }
      if (csvText[i] === '\r' || csvText[i] === '\n') {
        i++;
        if (csvText[i] === '\n') i++;
      }
      break;
    }
    if (row.some((c) => c.length > 0)) rows.push(row);
  }
  return rows;
}

const COL_级别 = 0;
const COL_词 = 1;
const COL_读音 = 2;
const COL_频次 = 3;
const COL_释义 = 4;
const COL_用法例句 = 5;

export function parseGradedVocabCSV(csvText: string): GradedVocabRow[] {
  const allRows = parseCSVRows(csvText);
  const rows: GradedVocabRow[] = [];
  for (const cells of allRows) {
    if (cells.length < 5) continue;
    const level = (cells[COL_级别] ?? '').trim();
    if (level === '级别' || !level.startsWith('Level')) continue;
    rows.push({
      级别: level,
      词: cells[COL_词] ?? '',
      读音: cells[COL_读音] ?? '',
      频次: cells[COL_频次] ?? '',
      释义: (cells[COL_释义] ?? '').replace(/\s+/g, ' ').slice(0, 120),
      用法例句: (cells[COL_用法例句] ?? '').replace(/\s+/g, ' ').slice(0, 80)
    });
  }
  return rows;
}

/** 是否为“请据《现代汉语词典》等辞书补充”占位释义（整条或包含该句） */
export const PLACEHOLDER_DEF = '（请据《现代汉语词典》等辞书补充）';
export function isPlaceholderDefinition(def: string): boolean {
  if (!def || !def.trim()) return true;
  return def.includes('请据《现代汉语词典》等辞书补充') || def.trim() === '（请据《现代汉语词典》等辞书补充）';
}

export function groupByLevel(rows: GradedVocabRow[]): Map<string, GradedVocabRow[]> {
  const map = new Map<string, GradedVocabRow[]>();
  for (const row of rows) {
    const level = row.级别 || 'Level 1';
    if (!map.has(level)) map.set(level, []);
    map.get(level)!.push(row);
  }
  const order = [...map.keys()].sort((a, b) => {
    const n1 = parseInt(a.replace(/\D/g, ''), 10) || 0;
    const n2 = parseInt(b.replace(/\D/g, ''), 10) || 0;
    return n1 - n2;
  });
  const sorted = new Map<string, GradedVocabRow[]>();
  for (const k of order) sorted.set(k, map.get(k)!);
  return sorted;
}
