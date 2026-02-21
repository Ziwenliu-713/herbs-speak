import type { TranslatedText } from '../../i18n/strings';

export type MediaKind = 'image' | 'video';

export type MediaItem = {
  id: string;
  kind: MediaKind;
  title: TranslatedText;
  description?: TranslatedText;
  src: string;
  poster?: string;
};

