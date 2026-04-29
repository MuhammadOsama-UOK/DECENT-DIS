import HeroSlider from './HeroSlider';
import AboutUs from './AboutUs';
import ServiceGrid from './ServiceGrid';
import ScrapSection from './ScrapSection';
import QuoteSection from './QuoteSection';
import ProcessSection from './ProcessSection';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { PackageOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const navigate = useNavigate();

  return (
    <main>
      <HeroSlider />

      {/* Repositioned Buy/Sell Scrap Section - Premium Trading Hub */}
      <div className="relative z-50 -mt-16 md:-mt-32 container mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "w-full max-w-6xl mx-auto bg-black/[0.9] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col items-center gap-12 group overflow-hidden transition-all duration-700",
            isUrdu && "md:text-right"
          )}
        >
          {/* Enhanced decorative background glow */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-yellow-500/5 blur-[120px] -z-10 group-hover:bg-yellow-500/10 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-orange-600/5 blur-[120px] -z-10"></div>
          
          <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center w-full", isUrdu && "lg:flex lg:flex-row-reverse")}>
            
            {/* BRANDING COLUMN */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-175 group-hover:scale-200 transition-transform duration-700"></div>
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-[0_20px_50px_rgba(234,179,8,0.4)] group-hover:rotate-6 transition-transform">
                   <PackageOpen className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={1} />
                </div>
              </div>
              <div className="space-y-4">
                <div className={cn("flex items-center justify-center lg:justify-start gap-3", isUrdu && "lg:justify-end")}>
                  <div className="h-px w-10 bg-yellow-500/50"></div>
                  <h3 className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-sm">{isUrdu ? "ماہر خدمات" : "Scrap Solutions"}</h3>
                  <div className="h-px w-10 bg-yellow-500/50"></div>
                </div>
                <h2 className={cn("text-3xl md:text-6xl font-black text-white leading-tight font-outfit uppercase tracking-tighter", isUrdu && "urdu-text leading-tight")}>
                  {isUrdu ? "سکریپ کی دنیا" : "THE ASSETS HUB"}
                </h2>
              </div>
            </div>

            {/* TRADING ACTIONS COLUMN */}
             <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative">
                {/* Desktop Divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block -translate-x-1/2"></div>

                {/* BUYING BOX */}
                <div className={cn("flex flex-col gap-6 group/box", isUrdu && "text-right")}>
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/box:bg-yellow-400 transition-colors">
                      <ArrowRight className={cn("w-5 h-5 text-yellow-500 group-hover/box:text-black transition-colors rotate-90", isUrdu && "rotate-[-90deg]")} />
                    </div>
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-wider">
                      {isUrdu ? "ہم خریدتے ہیں" : "We Buy"}
                    </h3>
                  </div>
                  <p className={cn("text-gray-400 text-sm md:text-xl font-medium leading-relaxed max-w-sm", isUrdu && "urdu-text text-xl ml-auto")}>
                    {isUrdu ? "ہم تانبا، لوہا اور ہر قسم کا صنعتی سکریپ بہترین قیمت پر خریدتے ہیں۔" : "Instant liquidity for all industrial assets, metals, and corporate surplus."}
                  </p>
                  <Link to="/scrap-rates" 
                    className="mt-4 inline-flex items-center gap-3 text-white hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    {isUrdu ? "قیمت معلوم کریں" : "Check Rates"}
                    <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                  </Link>
                </div>

                {/* SELLING BOX */}

                <div className={cn("flex flex-col gap-6 group/box", isUrdu && "text-right")}>
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/box:bg-yellow-400 transition-colors">
                      <ArrowRight className={cn("w-5 h-5 text-yellow-500 group-hover/box:text-black transition-colors -rotate-90", isUrdu && "rotate-[90deg]")} />
                    </div>
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-wider">
                      {isUrdu ? "ہم بیچتے ہیں" : "We Sell"}
                    </h3>
                  </div>
                  <p className={cn("text-gray-400 text-sm md:text-xl font-medium leading-relaxed max-w-sm", isUrdu && "urdu-text text-xl ml-auto")}>
                    {isUrdu ? "بہترین معیار کا سکریپ اور ری سائیکل شدہ مٹیریل براہ راست ہم سے حاصل کریں۔" : "Direct access to high-grade industrial materials and premium liquidated stock."}
                  </p>
                  <a href="https://wa.me/923152227331" target="_blank" rel="noopener noreferrer" 
                    className="mt-4 inline-flex items-center gap-3 text-white hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    {isUrdu ? "اسٹاک دیکھیں" : "Browse Inventory"}
                    <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                  </a>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

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
