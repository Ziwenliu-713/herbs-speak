/**
 * 释义翻译：使用 MyMemory 免费 API，带缓存
 * 仅用于 zh → en/fr/ru/es/ar
 */

const LANG_MAP: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  ru: 'ru',
  es: 'es',
  ar: 'ar'
};

const cache = new Map<string, string>();
const DELAY_MS = 350;

function cacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text.slice(0, 200)}`;
}

export function getCachedTranslation(text: string, targetLang: string): string | undefined {
  return cache.get(cacheKey(text, targetLang));
}

export function setCachedTranslation(text: string, targetLang: string, translated: string): void {
  cache.set(cacheKey(text, targetLang), translated);
}

/** 通过 CORS 代理请求，避免浏览器跨域拦截 */
function fetchWithProxy(url: string): Promise<string> {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  return fetch(proxyUrl).then((r) => r.text());
}

/** 单条翻译（带缓存）；浏览器内请求经 CORS 代理以支持联合国语言 */
export function translateText(text: string, targetLang: string): Promise<string> {
  const key = cacheKey(text, targetLang);
  const cached = cache.get(key);
  if (cached !== undefined) return Promise.resolve(cached);
  const code = LANG_MAP[targetLang];
  if (!code || !text.trim()) return Promise.resolve(text);
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=zh-CN|${code}`;
  return fetchWithProxy(apiUrl)
    .then((body) => {
      const data = JSON.parse(body) as { responseData?: { translatedText?: string } };
      const t = (data?.responseData?.translatedText ?? text) as string;
      cache.set(key, t);
      return t;
    })
    .catch(() => text);
}

/** 批量翻译（限速），返回 Map<原文, 译文> */
export async function translateBatch(
  texts: string[],
  targetLang: string,
  onProgress: (done: number, total: number) => void
): Promise<Map<string, string>> {
  const unique = [...new Set(texts)].filter((t) => t && t.trim());
  const result = new Map<string, string>();
  for (let i = 0; i < unique.length; i++) {
    const text = unique[i];
    const cached = getCachedTranslation(text, targetLang);
    if (cached !== undefined) {
      result.set(text, cached);
    } else {
      const translated = await translateText(text, targetLang);
      result.set(text, translated);
    }
    onProgress(i + 1, unique.length);
    if (i < unique.length - 1) await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  return result;
}
