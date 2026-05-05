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

      {/* Decent Disposal Core Services Widget */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden border-y border-white/5 mt-12">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
          >
            <source src="https://cdn.pixabay.com/video/2018/06/15/16843-277561822_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#050505] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#050505] to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
             {/* Section Title */}
             <div className={cn("bg-black/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.05)]", isUrdu && "text-right lg:order-last")}>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="flex flex-col mb-6 relative z-10">
                  <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-3 block">
                    {isUrdu ? "ڈیسنٹ ڈسپوزل" : "Decent Disposal"}
                  </span>
                  <h2 className={cn("text-4xl lg:text-5xl font-black text-white leading-tight uppercase font-outfit", isUrdu && "urdu-text leading-tight")}>
                    {isUrdu ? "ہماری خدمات" : "CORE SERVICES"}
                  </h2>
                </div>
                
                <p className={cn("text-gray-300 text-sm lg:text-base font-medium leading-relaxed relative z-10", isUrdu && "urdu-text")}>
                  {isUrdu ? "ہم بہترین صنعتی سکریپ کی خرید و فروخت کے ماہر ہیں۔ کارپوریٹ سطح پر مکمل حل۔" : "We are certified specialists in premium industrial scrap and corporate liquidation services across Pakistan."}
                </p>
             </div>

             {/* We Buy */}
             <div className={cn("bg-white/5 backdrop-blur-lg rounded-[2.5rem] p-8 lg:p-10 border border-white/10 relative overflow-hidden group hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col shadow-2xl", isUrdu && "text-right")}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-transparent group-hover:from-yellow-500/5 transition-colors duration-500 pointer-events-none"></div>
                <div className={cn("w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 group-hover:bg-yellow-500 group-hover:border-yellow-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-500 text-white", isUrdu && "ml-auto")}>
                    <ArrowRight className={cn("w-6 h-6 rotate-90", isUrdu && "rotate-[-90deg]")} />
                </div>
                <h3 className="text-white font-black text-2xl lg:text-3xl uppercase tracking-wider mb-4 relative z-10">
                   {isUrdu ? "ہم خریدتے ہیں" : "WE BUY"}
                </h3>
                <p className={cn("text-gray-300 text-sm lg:text-base font-medium leading-relaxed mb-8 flex-grow relative z-10", isUrdu && "urdu-text")}>
                  {isUrdu ? "ہم تانبا، لوہا اور ہر قسم کا صنعتی سکریپ بہترین قیمت پر خریدتے ہیں۔" : "Instant liquidity for all industrial assets, metals, and corporate surplus."}
                </p>
                <Link to="/scrap-rates" className={cn("inline-flex items-center gap-3 text-white group-hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-xs mt-auto relative z-10", isUrdu && "flex-row-reverse")}>
                   {isUrdu ? "قیمت معلوم کریں" : "CHECK RATES"} <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                </Link>
             </div>

             {/* We Sell */}
             <div className={cn("bg-white/5 backdrop-blur-lg rounded-[2.5rem] p-8 lg:p-10 border border-white/10 relative overflow-hidden group hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col shadow-2xl", isUrdu && "text-right")}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-transparent group-hover:from-yellow-500/5 transition-colors duration-500 pointer-events-none"></div>
                <div className={cn("w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 group-hover:bg-yellow-500 group-hover:border-yellow-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all duration-500 text-white", isUrdu && "ml-auto")}>
                    <ArrowRight className={cn("w-6 h-6 -rotate-90", isUrdu && "rotate-[90deg]")} />
                </div>
                <h3 className="text-white font-black text-2xl lg:text-3xl uppercase tracking-wider mb-4 relative z-10">
                   {isUrdu ? "ہم بیچتے ہیں" : "WE SELL"}
                </h3>
                <p className={cn("text-gray-300 text-sm lg:text-base font-medium leading-relaxed mb-8 flex-grow relative z-10", isUrdu && "urdu-text")}>
                  {isUrdu ? "بہترین معیار کا سکریپ اور ری سائیکل شدہ مٹیریل براہ راست ہم سے حاصل کریں۔" : "Direct access to high-grade industrial materials and premium liquidated stock."}
                </p>
                <a href="https://wa.me/923152227331" target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-3 text-white group-hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-xs mt-auto relative z-10", isUrdu && "flex-row-reverse")}>
                   {isUrdu ? "اسٹاک دیکھیں" : "BROWSE INVENTORY"} <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                </a>
             </div>

          </motion.div>
        </div>
      </section>

      <ProcessSection />
      <AboutUs />
      <ServiceGrid />
      <ScrapSection />
      <QuoteSection />
      
      {/* Global Clients Marquee */}
      <div className="bg-[#050505] py-16 border-y border-white/5 overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 text-center mb-10 relative z-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-yellow-500/80">Trusted By National Entities</h3>
         </div>
         
         {/* Marquee Container */}
         <div className="w-full relative flex overflow-x-hidden group z-10">
           {/* Gradient Masks for smooth fading edges */}
           <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20"></div>
           <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20"></div>
           
           <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
             {[...Array(2)].map((_, i) => (
               <div key={i} className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                  {['NADRA', 'STATE BANK', 'PAKISTAN STOCK EXCHANGE', 'NATIONAL BANK', 'K-ELECTRIC', 'PIA', 'PTCL', 'ENGRO'].map((client, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/item">
                       <span className="w-2 h-2 rounded-full bg-white/10 group-hover/item:bg-yellow-500 transition-colors"></span>
                       <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase group-hover/item:text-yellow-400 group-hover/item:scale-105 inline-block transition-all duration-300">
                         {client}
                       </span>
                    </div>
                  ))}
               </div>
             ))}
           </div>
         </div>
      </div>

      {/* LOCAL SEO CONTENT SECTION */}
      <section className="bg-[#080808] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute -left-40 top-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-yellow-400"></div>
                <span className="text-yellow-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Premium Services</span>
              </div>
              <h2 className={cn("text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight", isUrdu && "urdu-text leading-tight")}>
                {isUrdu ? "کراچی کے کارپوریٹ اور صنعتی شعبے کی خدمت" : "Serving Karachi’s Corporate & Industrial Sector"}
              </h2>
              <div className={cn("space-y-6 text-gray-400 md:text-lg font-medium leading-relaxed max-w-2xl", isUrdu && "urdu-text")}>
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
              className="lg:col-span-5 bg-[#111] p-10 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] -mr-32 -mt-32 group-hover:bg-yellow-500/20 transition-colors duration-700"></div>
              
              <h3 className={cn("text-2xl lg:text-3xl font-black text-white mb-10 tracking-wider relative z-10", isUrdu && "urdu-text")}>
                {isUrdu ? "ہماری ماہرانہ خدمات" : "Core Specializations"}
              </h3>
              
              <ul className={cn("space-y-6 relative z-10", isUrdu && "urdu-text text-right")}>
                {[
                  { en: "Industrial Scrap Acquisition", ur: "صنعت سکریپ کی خرید" },
                  { en: "Office Dismantling & Liquidation", ur: "آفس ڈسمینٹلنگ اور لیکویڈیشن" },
                  { en: "Premium Furniture Liquidators", ur: "استعمال شدہ دفتری فرنیچر" },
                  { en: "Corporate Site Renovation", ur: "کارپوریٹ سائٹ رینوویشن" },
                  { en: "Enterprise Waste Management", ur: "کارپوریٹ ویسٹ مینجمنٹ" }
                ].map((item, i) => (
                  <li key={i} className={cn("flex items-center gap-5 text-gray-500 group/item text-sm md:text-base font-semibold", isUrdu && "flex-row-reverse")}>
                    <span className="w-2.5 h-2.5 rounded-sm bg-white/10 shrink-0 group-hover/item:bg-yellow-400 group-hover/item:scale-125 transition-all group-hover/item:shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>
                    <span className="group-hover/item:text-white transition-colors tracking-wide">{isUrdu ? item.ur : item.en}</span>
                  </li>
                ))}
              </ul>
              
              <div className={cn("mt-12 flex relative z-10", isUrdu && "justify-end")}>
                 <button 
                  onClick={() => navigate('/portfolio')}
                  className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
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
