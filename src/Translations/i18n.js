import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import English from './English.json'
import Urdu from './Urdu.json'
import Hindi from './Hindi.json'



i18n
  .use(initReactI18next)
  .init({
    resources: {
      English: { translation: English },
      Urdu: { translation: Urdu },
      Hindi: { translation: Hindi },
    },
    lng: 'English', // Default language
    fallbackLng: 'English', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
