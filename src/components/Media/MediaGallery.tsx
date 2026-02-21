import { MediaCard } from './MediaCard';
import { MediaItem } from './types';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const { lang } = useLanguage();
  if (items.length === 0) {
    return <div className="empty">{pickText(ui.media.empty, lang)}</div>;
  }

  return (
    <section className="grid" aria-label="媒体画廊">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </section>
  );
}

