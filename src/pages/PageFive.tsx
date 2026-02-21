import { useState } from 'react';
import { CaojiShop } from '../components/CaojiShop/CaojiShop';
import { TcmMap } from '../components/TcmMap/TcmMap';
import { pageMedia } from '../data/pages';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';
import { PageShell } from './PageShell';

type CaojiTab = 'shop' | 'tcmMap';

export function PageFive() {
  const data = pageMedia.page5;
  const { lang } = useLanguage();
  const [tab, setTab] = useState<CaojiTab>('shop');

  return (
    <PageShell
      title={pickText(data.title, lang)}
      subtitle={pickText(data.subtitle, lang)}
      right={
        <div className="contactBox">
          <div className="contactTitle">{pickText(ui.contact.title, lang)}</div>
          <div className="contactRow">
            <span className="muted">{pickText(ui.contact.email, lang)}</span>
            <a href="mailto:1050917387@qq.com">1050917387@qq.com</a>
          </div>
        </div>
      }
    >
      <nav className="caojiTabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={`caojiTab ${tab === 'shop' ? 'caojiTabActive' : ''}`}
          onClick={() => setTab('shop')}
        >
          {pickText(ui.caojiShop.tabShop, lang)}
        </button>
        <button
          type="button"
          role="tab"
          className={`caojiTab ${tab === 'tcmMap' ? 'caojiTabActive' : ''}`}
          onClick={() => setTab('tcmMap')}
        >
          {pickText(ui.caojiShop.tabTcmMap, lang)}
        </button>
      </nav>
      {tab === 'shop' && <CaojiShop lang={lang} />}
      {tab === 'tcmMap' && <TcmMap lang={lang} />}
    </PageShell>
  );
}

