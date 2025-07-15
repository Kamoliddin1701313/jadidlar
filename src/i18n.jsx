import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import uzlTranslate from "./locales/uzl.json";
import uzkTranslate from "./locales/uzk.json";
import engTranslate from "./locales/eng.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uzl",
    lng: localStorage.getItem("i18nextLng") || "uzl",
    debug: true,

    resources: {
      uzl: { translation: uzlTranslate },
      uzk: { translation: uzkTranslate },
      eng: { translation: engTranslate },
    },
  });

export default i18n;
