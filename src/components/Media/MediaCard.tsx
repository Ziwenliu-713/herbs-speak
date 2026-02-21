import { MediaItem } from './types';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

export function MediaCard({ item }: { item: MediaItem }) {
  const { lang } = useLanguage();
  const title = pickText(item.title, lang);
  const description = item.description ? pickText(item.description, lang) : undefined;
  return (
    <article className="card" aria-label={title}>
      <div className="cardMedia">
        {item.kind === 'image' ? (
          <img className="mediaImage" src={item.src} alt={title} loading="lazy" />
        ) : (
          <video
            className="mediaVideo"
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
          />
        )}
      </div>

      <div className="cardBody">
        <div className="cardTitle">{title}</div>
        {description ? <div className="cardDesc">{description}</div> : null}
        <div className="cardMeta">
          <span className="pill">
            {item.kind === 'image' ? pickText(ui.media.image, lang) : pickText(ui.media.video, lang)}
          </span>
          <a className="link" href={item.src} target="_blank" rel="noreferrer">
            {pickText(ui.media.openSource, lang)}
          </a>
        </div>
      </div>
    </article>
  );
}

