import { AIMascot } from '../components/AIMascot/AIMascot';
import { pageMedia } from '../data/pages';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';
import { PageShell } from './PageShell';

/** 吉祥物图片：生成完成后将路径填入此处，或传入 AIMascot 的 mascotSrc */
const MASCOT_IMG = '';

export function PageThree() {
  const data = pageMedia.page3;
  const { lang } = useLanguage();
  return (
    <PageShell title={pickText(data.title, lang)} subtitle={pickText(data.subtitle, lang)}>
      <AIMascot lang={lang} mascotSrc={MASCOT_IMG} />

      <section className="tcmDigitalHumansSection" aria-labelledby="tcm-digital-humans-heading">
        <h2 id="tcm-digital-humans-heading" className="tcmDigitalHumansTitle">
          {pickText(ui.tcmDigitalHumans.title, lang)}
        </h2>
        <div className="tcmDigitalHumansGrid">
          <div className="tcmDigitalHumansSlot" role="img" aria-label={pickText(ui.tcmDigitalHumans.slot1, lang)}>
            <div className="tcmDigitalHumansPlaceholder" />
            <p className="tcmDigitalHumansSlotLabel">{pickText(ui.tcmDigitalHumans.slot1, lang)}</p>
          </div>
          <div className="tcmDigitalHumansSlot" role="img" aria-label={pickText(ui.tcmDigitalHumans.slot2, lang)}>
            <div className="tcmDigitalHumansPlaceholder" />
            <p className="tcmDigitalHumansSlotLabel">{pickText(ui.tcmDigitalHumans.slot2, lang)}</p>
          </div>
          <div className="tcmDigitalHumansSlot" role="img" aria-label={pickText(ui.tcmDigitalHumans.slot3, lang)}>
            <div className="tcmDigitalHumansPlaceholder" />
            <p className="tcmDigitalHumansSlotLabel">{pickText(ui.tcmDigitalHumans.slot3, lang)}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

