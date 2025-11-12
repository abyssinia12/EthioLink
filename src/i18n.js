import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./locales/en.json";
import amTranslations from "./locales/am.json";
import zhCNTranslations from "./locales/zh-CN.json";
import esTranslations from "./locales/es.json";
import arTranslations from "./locales/ar.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  am: {
    translation: amTranslations,
  },
  "zh-CN": {
    translation: zhCNTranslations,
  },
  es: {
    translation: esTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
