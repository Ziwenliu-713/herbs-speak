import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickText } from '../../i18n/strings';
import type { MeridianSlide } from '../../data/meridianCarousel';

export function ImageCarousel({ slides }: { slides: MeridianSlide[] }) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];
  if (!current || total === 0) return null;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="carousel" role="region" aria-label="经络图翻页">
      <div className="carouselMain">
        <button
          type="button"
          className="carouselBtn carouselBtnPrev"
          onClick={goPrev}
          aria-label="上一张"
        >
          ‹
        </button>
        <div className="carouselContent">
          <img
            className="carouselImage"
            src={current.src}
            alt={pickText(current.title, lang)}
            loading="lazy"
          />
          <div className="carouselCaption">{pickText(current.title, lang)}</div>
        </div>
        <button
          type="button"
          className="carouselBtn carouselBtnNext"
          onClick={goNext}
          aria-label="下一张"
        >
          ›
        </button>
      </div>
      <div className="carouselFooter">
        <span className="carouselCounter">
          {index + 1} / {total}
        </span>
        <div className="carouselDots" role="tablist" aria-label="页码">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`第 ${i + 1} 张`}
              className={i === index ? 'carouselDot active' : 'carouselDot'}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
