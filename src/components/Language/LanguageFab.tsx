import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { pickText, ui } from '../../i18n/strings';

export function LanguageFab() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const label = useMemo(() => pickText(ui.lang.label, lang), [lang]);

  return (
    <div className="langFab" data-open={open ? 'true' : 'false'}>
      <button
        type="button"
        className="langFabButton"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {lang.toUpperCase()}
      </button>

      {open ? (
        <div className="langFabMenu" role="menu" aria-label={label}>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'zh'}
            className={lang === 'zh' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('zh');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.zh, lang)}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'en'}
            className={lang === 'en' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('en');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.en, lang)}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'fr'}
            className={lang === 'fr' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('fr');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.fr, lang)}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'es'}
            className={lang === 'es' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('es');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.es, lang)}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'ru'}
            className={lang === 'ru' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('ru');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.ru, lang)}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={lang === 'ar'}
            className={lang === 'ar' ? 'langFabItem active' : 'langFabItem'}
            onClick={() => {
              setLang('ar');
              setOpen(false);
            }}
          >
            {pickText(ui.lang.ar, lang)}
          </button>
        </div>
      ) : null}
    </div>
  );
}

