import { useCallback, useEffect, useRef, useState } from 'react';
import type { Language } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';

const STORAGE_KEY = 'tcm-wellness-diary';
const MAX_IMAGES = 4;
const MAX_IMAGE_SIZE = 400 * 1024; // 400KB per image

export interface DiaryEntry {
  id: string;
  createdAt: number;
  content: string;
  images: string[];
}

function loadEntries(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DiaryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: DiaryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota or parse error
  }
}

function resizeImageAsDataUrl(file: File, maxW: number, maxBytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width;
      let h = img.height;
      if (w > maxW) {
        h = (h * maxW) / w;
        w = maxW;
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(url);
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      let quality = 0.85;
      const tryExport = () => {
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        if (dataUrl.length <= maxBytes || quality <= 0.3) {
          resolve(dataUrl);
          return;
        }
        quality -= 0.15;
        tryExport();
      };
      tryExport();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });
}

type View = 'cover' | 'write' | 'list';

interface WellnessDiaryProps {
  lang: Language;
}

export function WellnessDiary({ lang }: WellnessDiaryProps) {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [view, setView] = useState<View>('cover');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const persist = useCallback((next: DiaryEntry[]) => {
    setEntries(next);
    saveEntries(next);
  }, []);

  const openWrite = useCallback(() => {
    setContent('');
    setImages([]);
    setView('write');
  }, []);

  const closeWrite = useCallback(() => {
    setView('cover');
    setViewingId(null);
  }, []);

  const handleSave = useCallback(() => {
    const trimmed = content.trim();
    if (!trimmed && images.length === 0) {
      closeWrite();
      return;
    }
    const entry: DiaryEntry = {
      id: `diary-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      content: trimmed,
      images: [...images]
    };
    persist([entry, ...entries]);
    closeWrite();
  }, [content, images, entries, persist, closeWrite]);

  const handleAddPhoto = useCallback(() => {
    if (images.length >= MAX_IMAGES) return;
    fileInputRef.current?.click();
  }, [images.length]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || !file.type.startsWith('image/') || images.length >= MAX_IMAGES) return;
      resizeImageAsDataUrl(file, 800, MAX_IMAGE_SIZE)
        .then((dataUrl) => setImages((prev) => [...prev, dataUrl].slice(0, MAX_IMAGES)))
        .catch(() => {});
    },
    [images.length]
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const viewEntry = useCallback((id: string) => {
    setViewingId(id);
    setView('list');
  }, []);

  const backToList = useCallback(() => setViewingId(null), []);

  const entryCountText = pickText(ui.wellnessDiary.entryCount, lang).replace('{{n}}', String(entries.length));

  return (
    <section className="wellnessDiarySection" aria-labelledby="wellness-diary-heading">
      <h2 id="wellness-diary-heading" className="wellnessDiaryTitle">
        {pickText(ui.wellnessDiary.title, lang)}
      </h2>
      <p className="wellnessDiaryIntro">
        {pickText(ui.wellnessDiary.intro, lang)}
      </p>

      {/* 横线笔记封面：仅 cover 时显示完整封面，write 时封面保留、下方延展 */}
      <div className={`wellnessDiaryCover ${view === 'write' ? 'wellnessDiaryCoverExpanded' : ''}`}>
        <div className="wellnessDiaryCoverLines" aria-hidden />
        <div className="wellnessDiaryCoverContent">
          {view !== 'write' && (
            <>
              <button
                type="button"
                className="wellnessDiaryCoverBtn"
                onClick={openWrite}
                aria-label={pickText(ui.wellnessDiary.coverBtn, lang)}
              >
                {pickText(ui.wellnessDiary.coverBtn, lang)}
              </button>
              <div className="wellnessDiaryCoverMeta">
                {view === 'list' ? (
                  <button type="button" className="wellnessDiaryViewListBtn" onClick={() => setView('cover')}>
                    {pickText(ui.wellnessDiary.close, lang)}
                  </button>
                ) : (
                  <button type="button" className="wellnessDiaryViewListBtn" onClick={() => setView('list')}>
                    {pickText(ui.wellnessDiary.viewDiary, lang)}
                  </button>
                )}
                {entries.length > 0 && <span className="wellnessDiaryCount">{entryCountText}</span>}
              </div>
            </>
          )}
        </div>

        {/* 延展开的横线书写区 */}
        {view === 'write' && (
          <div className="wellnessDiaryPaper">
            <div className="wellnessDiaryPaperLines" aria-hidden />
            <div className="wellnessDiaryPaperContent">
              <textarea
                className="wellnessDiaryTextarea"
                placeholder={pickText(ui.wellnessDiary.placeholder, lang)}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
              <div className="wellnessDiaryPhotos">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="wellnessDiaryFileInput"
                  aria-hidden
                  onChange={handleFileChange}
                />
                {images.map((src, i) => (
                  <div key={i} className="wellnessDiaryPhotoWrap">
                    <img src={src} alt="" className="wellnessDiaryPhoto" />
                    <button
                      type="button"
                      className="wellnessDiaryPhotoRemove"
                      onClick={() => removeImage(i)}
                      aria-label={pickText(ui.wellnessDiary.removePhoto, lang)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {images.length < MAX_IMAGES && (
                  <button type="button" className="wellnessDiaryAddPhotoBtn" onClick={handleAddPhoto}>
                    {pickText(ui.wellnessDiary.addPhoto, lang)}
                  </button>
                )}
              </div>
              <div className="wellnessDiaryActions">
                <button type="button" className="wellnessDiarySaveBtn" onClick={handleSave}>
                  {pickText(ui.wellnessDiary.save, lang)}
                </button>
                <button type="button" className="wellnessDiaryCloseBtn" onClick={closeWrite}>
                  {pickText(ui.wellnessDiary.close, lang)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 日记列表 / 单篇查看 */}
      {view === 'list' && (
        <div className="wellnessDiaryListWrap">
          {viewingId ? (
            (() => {
              const entry = entries.find((e) => e.id === viewingId);
              if (!entry) return null;
              const dateStr = new Date(entry.createdAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return (
                <div className="wellnessDiaryDetail">
                  <div className="wellnessDiaryDetailMeta">{dateStr}</div>
                  <div className="wellnessDiaryDetailContent">{entry.content || '—'}</div>
                  {entry.images.length > 0 && (
                    <div className="wellnessDiaryDetailPhotos">
                      {entry.images.map((src, i) => (
                        <img key={i} src={src} alt="" className="wellnessDiaryDetailPhoto" />
                      ))}
                    </div>
                  )}
                  <button type="button" className="wellnessDiaryBackBtn" onClick={backToList}>
                    ← {pickText(ui.wellnessDiary.backToList, lang)}
                  </button>
                </div>
              );
            })()
          ) : (
            <>
              <div className="wellnessDiaryListHead">
                <button type="button" className="wellnessDiaryBackToCoverBtn" onClick={() => setView('cover')}>
                  ← {pickText(ui.wellnessDiary.close, lang)}
                </button>
                <button type="button" className="wellnessDiaryNewEntryBtn" onClick={openWrite}>
                  {pickText(ui.wellnessDiary.newEntry, lang)}
                </button>
              </div>
              {entries.length === 0 ? (
                <p className="wellnessDiaryNoEntries">{pickText(ui.wellnessDiary.noEntries, lang)}</p>
              ) : (
                <ul className="wellnessDiaryEntryList">
                  {entries.map((entry) => {
                    const dateStr = new Date(entry.createdAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                    const preview = entry.content.slice(0, 60) + (entry.content.length > 60 ? '…' : '');
                    return (
                      <li key={entry.id}>
                        <button
                          type="button"
                          className="wellnessDiaryEntryCard"
                          onClick={() => viewEntry(entry.id)}
                        >
                          <span className="wellnessDiaryEntryDate">{dateStr}</span>
                          <span className="wellnessDiaryEntryPreview">{preview || '—'}</span>
                          {entry.images.length > 0 && (
                            <span className="wellnessDiaryEntryBadge">{entry.images.length} 📷</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
