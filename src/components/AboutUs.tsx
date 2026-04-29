import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { useState, useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { useSiteSettings } from '@/src/lib/SiteContext';

export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const siteSettings = useSiteSettings();

  const yearsLabel = "10+";

  return (
    <section className="bg-[#070b14] py-24 px-6 md:px-12 font-poppins text-white overflow-hidden" id="about">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 max-w-7xl">
        
        {/* Left Visual Content */}
        <div className="relative flex-1 min-w-[350px]">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80" 
            alt="Professional Interior Renovation Pakistan" 
            className="w-full rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
          />
          
          {/* Experience Floating Badge */}
          <div className="absolute -bottom-8 -right-4 bg-[#64ffda10] backdrop-blur-[15px] p-8 rounded-[20px] border border-[#64ffda] text-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-float">
            <h4 className="text-4xl md:text-5xl font-black text-[#64ffda] m-0 font-montserrat">{yearsLabel}</h4>
            <p className="text-[0.9rem] m-0 uppercase tracking-[1px] font-semibold text-[#64ffda]">Years of <br />Excellence</p>
          </div>
        </div>

        {/* Right Text Content */}
        <div className={cn("flex-[1.2] min-w-[350px]", isUrdu && "text-right")}>
          <span className="text-[#64ffda] font-bold uppercase tracking-[3px] block mb-4">
            {isUrdu ? "2014 سے" : "Since 2014"}
          </span>
          <h2 className={cn("text-[clamp(2rem,5vw,3rem)] font-black leading-[1.2] mb-6 font-montserrat uppercase", isUrdu && "urdu-text leading-tight")}>
            {isUrdu 
              ? <>پاکستان کے لیڈرز برائے <br /><span className="text-[#64ffda]">رینوویشن اور ڈسپوزل</span></>
              : <>Pakistan's Leaders in <br /><span className="text-[#64ffda]">Interior & Disposal</span></>
            }
          </h2>
          
          <p className={cn("text-[#a0aec0] leading-[1.8] text-lg mb-8 font-poppins", isUrdu && "urdu-text text-xl")}>
            {isUrdu
               ? <><strong>ڈی سینٹ ڈسپوزل</strong> پر، ہم پائیداری اور عیش و آرام کے درمیان فرق کو ختم کرتے ہیں۔ محمد عدنان (بانی) اور تنویر احمد (سی ای او) کی قیادت میں، ہم پاکستان کے اعلیٰ ترین انٹیریئر رینوویشن کے ماہرین اور سکریپ ڈیلرز کے طور پر پہچانے جاتے ہیں۔ ہم کارپوریٹ اور رہائشی جگہوں کو جدید شاہکاروں میں تبدیل کرتے ہیں۔</>
               : <>At <strong>Decent Disposal</strong>, we bridge the gap between sustainability and luxury. Under the visionary leadership of <strong>Muhammad Adnan</strong> (Founder) and <strong>Tanveer Ahmed</strong> (CEO), we have grown to become Pakistan’s top-rated interior renovation experts and scrap dealers. Our commitment to excellence and sustainable practices drives our mission to transform corporate and residential spaces into modern masterpieces.</>
            }
          </p>

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
