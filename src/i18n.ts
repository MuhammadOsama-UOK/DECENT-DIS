import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "Decent Disposal",
      "tagline": "Karachi's Trusted Renovation & Scrap Experts",
      "renovation": "Office Renovation",
      "scrap": "Industrial Scrap",
      "lead_generation": "Get a Free Quote",
      "rates": "Current Market Rates",
      "whatsapp": "WhatsApp Us",
      "hero_renovation_title": "Modern Spaces, Expertly Renovated",
      "hero_renovation_sub": "Luxury interior design and corporate renovation solutions for DHA, Clifton, and beyond.",
      "hero_scrap_title": "Industrial Scrap Management & Buying",
      "hero_scrap_sub": "Transparent, fast, and competitive rates for large-scale industrial liquidation in Karachi.",
      "view_projects": "View Projects",
      "todays_rates": "Today's Metal Market Rates",
      "metal_type": "Metal Type",
      "price_per_kg": "Price per KG",
      "trend": "Market Trend",
      "serving": "Serving Industrial Areas: SITE, Korangi, Port Qasim, North Karachi, Landhi."
    }
  },
  ur: {
    translation: {
      "app_name": "ڈی سینٹ ڈسپوزل",
      "tagline": "کراچی کا قابلِ بھروسہ رینوویشن اور سکریپ ماہر",
      "renovation": "آفس رینوویشن",
      "scrap": "انڈسٹریل سکریپ",
      "lead_generation": "مفت کوٹیشن حاصل کریں",
      "rates": "مارکیٹ کے ریٹ",
      "whatsapp": "واٹس ایپ ہم سے",
      "hero_renovation_title": "جدید ڈیزائن، بہترین رینوویشن",
      "hero_renovation_sub": "ڈی ایچ اے، کلفٹن اور مزید کے لیے لگژری انٹیریئر ڈیزائن حل۔",
      "hero_scrap_title": "انڈسٹریل سکریپ مینجمنٹ اور خریداری",
      "hero_scrap_sub": "کراچی میں بڑے پیمانے پر انڈسٹریل لیکویڈیشن کے لیے شفاف اور تیز ترین ریٹ۔",
      "view_projects": "پروجیکٹس دیکھیں",
      "todays_rates": "آج کے لوہے کے ریٹ",
      "metal_type": "دھات کی قسم",
      "price_per_kg": "فی کلو قیمت",
      "trend": "مارکیٹ رجحان",
      "serving": "انڈسٹریل ایریاز: سائٹ، کورنگی، پورٹ قاسم، نارتھ کراچی، لانڈھی۔"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
