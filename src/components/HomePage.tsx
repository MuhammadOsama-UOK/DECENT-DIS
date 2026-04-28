import HeroSlider from './HeroSlider';
import AboutUs from './AboutUs';
import ServiceGrid from './ServiceGrid';
import ScrapSection from './ScrapSection';
import QuoteSection from './QuoteSection';
import ProcessSection from './ProcessSection';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const navigate = useNavigate();

  return (
    <main>
      <HeroSlider />
      <ProcessSection />
      <AboutUs />
      <ServiceGrid />
      <ScrapSection />
      <QuoteSection />
      
      {/* Global Clients Marquee */}
      <div className="bg-black py-16 border-y border-white/5 overflow-hidden">
         <div className="container mx-auto px-6 text-center mb-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-600">Trusted By National Entities</h3>
         </div>
         <div className="flex items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all px-6">
            <span className="text-xl md:text-2xl font-black italic text-white">NADRA</span>
            <span className="text-xl md:text-2xl font-black italic text-white">SBP</span>
            <span className="text-xl md:text-2xl font-black italic text-white">PSX</span>
            <span className="text-xl md:text-2xl font-black italic text-white">NBP</span>
            <span className="text-xl md:text-2xl font-black italic text-white">KE</span>
            <span className="text-xl md:text-2xl font-black italic text-white md:block hidden">PIA</span>
          </div>
      </div>

      {/* LOCAL SEO CONTENT SECTION */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={cn("text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight", isUrdu && "urdu-text")}>
                {isUrdu ? "کراچی کے کارپوریٹ اور صنعتی شعبے کی خدمت" : "Serving Karachi’s Corporate & Industrial Sector"}
              </h2>
              <div className={cn("space-y-6 text-gray-600 md:text-lg", isUrdu && "urdu-text")}>
                <p>
                  {isUrdu 
                    ? "ڈیسنٹ ڈسپوزل کراچی بھر میں صنعتی سکریپ خریدنے والا سب سے بڑا ادارہ ہے۔ ہم فیکٹریوں، دفاتر اور کمرشل سائٹس کے لیے بہترین خدمات فراہم کرتے ہیں۔" 
                    : "Decent Disposal is recognized as the leading industrial scrap buyers in Karachi. Our specialized team handles everything from complex office dismantling services to bulk used furniture acquisition for multinational firms."}
                </p>
                <p>
                  {isUrdu 
                    ? "ہم پاکستان میں کم بجٹ والی سائٹ کی تزئین و آرائش کے ماہر ہیں، جو معیار پر سمجھوتہ کیے بغیر آپ کے پرانے دفاتر کو نیا بنانے کی صلاحیت رکھتے ہیں۔" 
                    : "We are experts in low-budget site renovation in Pakistan, proving that premium office aesthetics can be achieved without sky-high costs. From the SITE Area to Landhi and Port Qasim, our local presence ensures immediate site visits and fair market valuations."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/20 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className={cn("text-2xl font-black text-white mb-8 tracking-wider", isUrdu && "urdu-text")}>
                {isUrdu ? "ہماری ماہرانہ خدمات" : "Our Core Specializations"}
              </h3>
              <ul className={cn("space-y-4", isUrdu && "urdu-text")}>
                {[
                  { en: "Industrial Scrap Buyers Karachi", ur: "صنعت سکریپ خریدار کراچی" },
                  { en: "Office Dismantling & Liquidation", ur: "آفس ڈسمینٹلنگ اور لیکویڈیشن" },
                  { en: "Used Office Furniture Buyers", ur: "استعمال شدہ دفتری فرنیچر کے خریدار" },
                  { en: "Budget Site Renovation Pakistan", ur: "بجٹ سائٹ رینوویشن پاکستان" },
                  { en: "Corporate Waste Management", ur: "کارپوریٹ ویسٹ مینجمنٹ" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-400 group/item text-sm md:text-base">
                    <span className="w-2 h-2 rounded-full bg-primary-green shrink-0"></span>
                    <span className="font-bold group-hover/item:text-white transition-colors">{isUrdu ? item.ur : item.en}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex justify-center lg:justify-start">
                 <button 
                  onClick={() => navigate('/portfolio')}
                  className="bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-green hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {isUrdu ? "ہماری نیٹ ورک دیکھیں" : "View Our Network"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
