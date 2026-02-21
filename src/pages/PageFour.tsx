import { ZhixingCommunity } from '../components/ZhixingCommunity/ZhixingCommunity';
import { pageMedia } from '../data/pages';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText } from '../i18n/strings';
import { PageShell } from './PageShell';

export function PageFour() {
  const data = pageMedia.page4;
  const { lang } = useLanguage();
  return (
    <PageShell title={pickText(data.title, lang)} subtitle={pickText(data.subtitle, lang)}>
      <ZhixingCommunity lang={lang} />
    </PageShell>
  );
}

