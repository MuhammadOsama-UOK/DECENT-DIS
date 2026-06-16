import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { useSiteSettings } from '@/src/lib/SiteContext';

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isUrdu = i18n.language === 'ur';
  const siteSettings = useSiteSettings();

  const yearsLabel = "10+";

  return (
    <section className="bg-[#070b14] py-24 px-6 md:px-12 font-poppins text-white overflow-hidden relative" id="about">

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 max-w-7xl">
        
        {/* Left Visual Content */}
        <div className="relative w-full lg:flex-1 md:min-w-[350px]">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80" 
            alt="Professional Interior Renovation Pakistan" 
            className="w-full rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
          />
          
          {/* Experience Floating Badge */}
          <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-[20px] border border-[#64ffda] text-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-float">
            <h4 className="text-3xl md:text-5xl font-black text-[#64ffda] m-0 font-montserrat">{yearsLabel}</h4>
            <p className="text-xs md:text-[0.9rem] m-0 uppercase tracking-[1px] font-semibold text-[#64ffda]">Years of <br />Excellence</p>
          </div>
        </div>

        {/* Right Text Content */}
        <div className={cn("w-full lg:flex-[1.2] md:min-w-[350px] mt-12 lg:mt-0", isUrdu && "text-right")}>
          <span className="text-[#64ffda] font-bold uppercase tracking-[3px] block mb-4">
            {isUrdu ? "2014 سے" : "Since 2014"}
          </span>
          <h2 className={cn("text-[clamp(2rem,5vw,3rem)] font-black leading-[1.2] mb-6 font-montserrat uppercase", isUrdu && "urdu-text leading-tight")}>
            {isUrdu 
              ? <>پاکستان کے ماہرانہ خدمات فراہم کرنے والے برائے <br /><span className="text-[#64ffda]">انٹیریئر رینوویشن اور اسکریپ ڈسپوزل</span></>
              : <>Pakistan's Experts in <br /><span className="text-[#64ffda]">Interior Renovation & Scrap Disposal</span></>
            }
          </h2>
          
          <div className={cn("text-[#a0aec0] space-y-6 text-base md:text-lg font-poppins mb-8", isUrdu && "urdu-text text-right")}>
            {isUrdu ? (
              <p className="leading-[1.8] text-xl">
                <strong>ڈی سینٹ ڈسپوزل (Decent Disposal)</strong> پاکستان کی سب سے معتبر اور لائسنس یافتہ کمپنی ہے جو کارپوریٹ دفاتر کی جدید ترین ڈیزائننگ، رینوویشن، لفٹنگ شفٹنگ اور انڈسٹریل اسکریپ کی خریداری میں مہارت رکھتی ہے۔ بانی <strong>محمد عدنان</strong> اور سی ای او <strong>تنویر احمد</strong> کی قیادت میں، ہم نے ملک کے بڑے بڑے اداروں کے ساتھ مل کر کامیابی سے پراجیکٹس سر انجام دیے ہیں۔ ہماری اولین ترجیح بہترین معیار، مکمل شفافیت اور ماحول دوست طریقے سے کارپوریٹ سروسز فراہم کرنا ہے۔
              </p>
            ) : (
              <>
                <p className="leading-[1.8]">
                  At <strong>Decent Disposal</strong>, we bridge the gap between premium excellence and eco-friendly practices. Under the visionary leadership of <strong>Muhammad Adnan</strong> (Founder) and <strong>Tanveer Ahmed</strong> (CEO), we have grown into one of Pakistan's most trusted corporate service providers, specializing in high-end office design, safety structural shifting, and premium industrial asset liquidation.
                </p>
                
                {/* Roman Urdu Persuasive Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#64ffda]/5 via-[#64ffda]/10 to-transparent border border-[#64ffda]/20 relative overflow-hidden mt-6">
                  <div className="absolute top-0 right-0 bg-[#070b14] text-[#64ffda] font-mono font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-widest border-l border-b border-[#64ffda]/20">
                    Aasan Lafzon Me
                  </div>
                  <h4 className="text-[#64ffda] font-bold text-sm uppercase tracking-wider mb-2 font-montserrat">Hamari Kahani:</h4>
                  <p className="text-gray-300 font-medium text-[0.95rem] leading-[1.7] italic pr-8">
                    "Decent Disposal, Pakistan ki sub se trusted aur certified company hai. Hum office renovation, state-of-the-art glass work, decorative ceilings, painting aur bare paimane par heavy machinery ya industrial scrap buy karne me deal karte hain. Humare sath deal karne ka matlab hai clear and safe transactions, 100% genuine pricing aur expert execution jo saalo saal chalti rahay."
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <FeatureItem urdu={isUrdu} label={isUrdu ? "جدید آفس ریموڈلنگ" : "Modern Office Remodeling"} />
            <FeatureItem urdu={isUrdu} label={isUrdu ? "ماحول دوست سکریپ خریداری" : "Eco-Friendly Scrap Buying"} />
            <FeatureItem urdu={isUrdu} label={isUrdu ? "پریمیم گلاس اور وڈ ورک" : "Premium Glass & Wood Work"} />
            <FeatureItem urdu={isUrdu} label={isUrdu ? "سرٹیفائیڈ رینوویشن ٹیم" : "Certified Renovation Team"} />
          </div>

          <Link to="/process" className="inline-block px-10 py-4 bg-[#64ffda] text-[#070b14] font-bold rounded-[5px] transition-all hover:bg-white hover:-translate-y-1 uppercase">
            {isUrdu ? "ہمارا طریقہ کار دیکھیں" : "Discover Our Process"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ label, urdu }: { label: string, urdu: boolean }) {
  return (
    <div className={cn("flex items-center gap-4", urdu && "flex-row-reverse")}>
      <div className="w-10 h-10 bg-[#64ffda1a] text-[#64ffda] flex items-center justify-center rounded-[10px] flex-shrink-0">
        <Check className="w-5 h-5" />
      </div>
      <span className={cn("font-semibold text-white", urdu && "urdu-text")}>{label}</span>
    </div>
  );
}
