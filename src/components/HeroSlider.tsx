import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { useSiteSettings } from '@/src/lib/SiteContext';

export default function HeroSlider() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const siteSettings = useSiteSettings();

  const heroEn = "DECENT DISPOSAL";
  const heroSubEn = "Premium Asset Management & Renovation Experts. We refine corporate spaces and maximize value for your industrial assets.";
  const heroUr = "ڈی سینٹ ڈسپوزل";
  const heroSubUr = "پریمیم اثاثہ مینجمنٹ اور رینوویشن کے ماہرین۔ ہم کارپوریٹ جگہوں کو بہتر بناتے ہیں اور آپ کے صنعتی اثاثوں کی قدر میں اضافہ کرتے ہیں۔";
  
  const partsEn = heroEn.split(' ');
  const lastWordEn = partsEn.pop();
  const mainTitleEn = partsEn.join(' ');

  const partsUr = heroUr.split(' ');
  const lastWordUr = partsUr.pop();
  const mainTitleUr = partsUr.join(' ');

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={true}
        speed={1200}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
            el: '.swiper-pagination',
        }}
        className="h-full w-full"
      >
        {/* SLIDE 1: COMPANY BRAND */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Decent Disposal Building" />
            <div className="slide-overlay absolute inset-0 flex items-center px-6 md:px-20 z-10">
              <div className={cn("max-w-4xl animate-hero", isUrdu && "text-right ml-auto")}>
                <h1 className={cn("text-5xl md:text-8xl font-black text-white leading-tight mb-4 uppercase font-outfit", isUrdu && "urdu-text leading-tight")}>
                  {isUrdu 
                    ? <>{mainTitleUr} <span className="text-yellow-400">{lastWordUr}</span></>
                    : <>{mainTitleEn} <span className="text-yellow-400">{lastWordEn}</span></>}
                </h1>
                <p className={cn("text-gray-300 text-lg md:text-xl max-w-2xl font-poppins", isUrdu && "urdu-text ml-auto")}>
                  {isUrdu ? heroSubUr : heroSubEn}
                </p>
                
                <div className={cn("glass-button-container", isUrdu && "flex-row-reverse self-end")}>
                  <Link to="/portfolio" className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded-xl font-bold transition-all text-center">
                    {t('renovation')}
                  </Link>
                  <Link to="/quote" className="border border-white/40 hover:bg-white text-white hover:text-black px-10 py-4 rounded-xl font-bold transition-all text-center">
                    {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: OFFICE RENOVATION */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Office Renovation Marble and Wood" />
            <div className="slide-overlay absolute inset-0 flex items-center px-6 md:px-20 z-10">
              <div className={cn("max-w-4xl animate-hero", isUrdu && "text-right ml-auto")}>
                <h2 className={cn("text-5xl md:text-7xl font-black text-white leading-tight mb-4 uppercase font-outfit", isUrdu && "urdu-text leading-tight")}>
                  {isUrdu ? "آفس" : "OFFICE"} <span className="text-blue-400">{isUrdu ? "رینوویشن" : "RENOVATION"}</span>
                </h2>
                <p className={cn("text-gray-300 text-lg md:text-xl max-w-2xl font-poppins", isUrdu && "urdu-text ml-auto")}>
                  {isUrdu
                    ? "لگژری وڈ ورک، اطالوی سنگ مرمر اور ڈیزائنر چھتوں میں مہارت۔ آپ کے دفتر کو جدید کمال تک پہنچانا۔"
                    : "Specialized in Luxury Wood Work, Italian Marble, and Designer Ceilings. Elevating your office to modern perfection."}
                </p>
                
                <div className={cn("glass-button-container", isUrdu && "flex-row-reverse self-end")}>
                  <Link to="/portfolio" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all text-center">
                    {t('view_projects')}
                  </Link>
                  <Link to="/quote" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-bold transition-all text-center backdrop-blur-md">
                    {t('lead_generation')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: SCRAP BUYING */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Industrial Scrap Buyer" />
            <div className="slide-overlay absolute inset-0 flex items-center px-6 md:px-20 z-10">
              <div className={cn("max-w-4xl animate-hero", isUrdu && "text-right ml-auto")}>
                 <h2 className={cn("text-5xl md:text-7xl font-black text-white leading-tight mb-4 uppercase font-outfit", isUrdu && "urdu-text leading-tight")}>
                    {isUrdu ? "سکریپ" : "SCRAP"} <span className="text-green-500">{isUrdu ? "خریداری سروس" : "BUYING SERVICE"}</span>
                </h2>
                <p className={cn("text-gray-300 text-lg md:text-xl max-w-2xl font-poppins", isUrdu && "urdu-text ml-auto")}>
                  {isUrdu
                    ? "تانبا، ایلومینیم، پرانا فرنیچر، یو پی ایس اور بیٹریاں۔ تمام صنعتی اشیاء کے لیے فوری ادائیگی۔"
                    : "Best rates for Copper, Aluminum, Old Furniture, UPS Systems, and Batteries. Instant liquidation for all industrial items."}
                </p>
                
                <div className={cn("glass-button-container flex-wrap", isUrdu && "flex-row-reverse self-end")}>
                  <a href="https://wa.me/923313141853" target="_blank" rel="noopener noreferrer" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-10 py-4 rounded-xl font-bold transition-all text-center">
                    WhatsApp Now
                  </a>
                  <Link to="/quote" className="bg-white text-green-600 border border-green-500 hover:bg-green-500 hover:text-white px-10 py-4 rounded-xl font-bold transition-all text-center">
                    Send Item List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        
        <div className="swiper-pagination !bottom-10"></div>
      </Swiper>

      <style>{`
        .swiper-pagination-bullet { width: 12px; height: 12px; background: rgba(255,255,255,0.5); opacity: 1; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { background: #f1c40f !important; width: 30px !important; border-radius: 6px !important; }
      `}</style>
    </section>
  );
}
