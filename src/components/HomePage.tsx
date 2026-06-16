import HeroSlider from './HeroSlider';
import AboutUs from './AboutUs';
import ServiceGrid from './ServiceGrid';
import ScrapGrid from './ScrapGrid';
import QuoteSection from './QuoteSection';
import CustomerReviews from './CustomerReviews';
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
        {/* Lighter Background instead of Video */}
        <div className="absolute inset-0 w-full h-full z-0 bg-[#050505]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#082f1f]/20 to-[#0f2027]/20"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
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
             <div className={cn("bg-gradient-to-br from-yellow-500/10 via-black/40 to-black/60 border border-yellow-500/20 rounded-[2.5rem] p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden shadow-[0_0_80px_rgba(234,179,8,0.1)] group", isUrdu && "text-right lg:order-last")}>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 to-transparent rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
                
                <div className="flex flex-col mb-6 relative z-10">
                  <div className={cn("flex items-center gap-3 mb-4", isUrdu && "justify-end")}>
                    <div className="h-px w-12 bg-yellow-500"></div>
                    <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-sm">
                      {isUrdu ? "ڈیسنٹ ڈسپوزل" : "Expert Solutions"}
                    </span>
                  </div>
                  <h2 className={cn("text-4xl lg:text-6xl font-black text-white leading-[1.1] uppercase font-outfit tracking-tighter", isUrdu && "urdu-text leading-tight")}>
                    {isUrdu ? "ہماری ماہرانہ خدمات" : "CORE SERVICES"}
                  </h2>
                </div>
                
                <p className={cn("text-gray-300 text-sm lg:text-lg font-medium leading-relaxed relative z-10 border-l-2 border-yellow-500/30 pl-4", isUrdu && "urdu-text border-l-0 border-r-2 pl-0 pr-4")}>
                  {isUrdu 
                    ? "کراچی میں صنعتی سکریپ کی پروفیشنل خرید و فروخت اور کارپوریٹ سطح پر سائٹ کی مکمل تزئین و آرائش کے ماہر۔" 
                    : "Karachi’s leading authority in professional industrial asset recovery and high-end site renovation services."}
                </p>
                
                <p className={cn("text-yellow-400 font-black text-sm lg:text-lg mt-4 relative z-10 border-l-2 border-yellow-400 pl-4 uppercase tracking-wider animate-pulse", isUrdu && "urdu-text border-l-0 border-r-2 pl-0 pr-4")}>
                  {isUrdu 
                    ? "ہم انتہائی پروفیشنل لفٹنگ اور فیکٹری شفٹنگ کی خدمات بھی فراہم کرتے ہیں!" 
                    : "We also offer Professional Heavy Lifting & Shifting Services!"}
                </p>
             </div>

             {/* We Buy */}
             <div className={cn("bg-[#111]/80 rounded-[2.5rem] p-6 lg:p-10 border border-white/5 relative overflow-hidden group hover:bg-yellow-500 hover:border-yellow-400 transition-all duration-700 flex flex-col shadow-2xl", isUrdu && "text-right")}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-transparent group-hover:from-black/10 transition-colors duration-500 pointer-events-none"></div>
                
                <div className={cn("w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all duration-500 text-black", isUrdu && "ml-auto")}>
                    <ArrowRight className={cn("w-8 h-8 rotate-90", isUrdu && "rotate-[-90deg]")} />
                </div>

                <div className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  <h3 className="text-white group-hover:text-black font-black text-3xl lg:text-4xl uppercase tracking-tighter mb-4">
                     {isUrdu ? "ہم خریدتے ہیں" : "WE BUY"}
                  </h3>
                  <p className={cn("text-gray-400 group-hover:text-black/80 text-sm lg:text-base font-bold leading-relaxed mb-8 flex-grow", isUrdu && "urdu-text")}>
  {isUrdu 
    ? "ہم  ہر قسم کا صنعتی سکریپ  اور تانبا، لوہا بہترین مارکیٹ ریٹ پر خریدتے ہیں " 
    : "Premium buyers of industrial scrap, copper, iron, and corporate surplus at best market rates."}
</p>
                  
                  <Link to="/scrap-rates" className={cn("inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs mt-auto border-b-2 border-yellow-500/20 pb-1 group-hover:border-black/30", isUrdu && "flex-row-reverse")}>
                     {isUrdu ? "قیمت معلوم کریں" : "VIEW PRICE LIST"} <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                  </Link>
                </div>
             </div>

             {/* We Sell */}
             <div className={cn("bg-[#111]/80 rounded-[2.5rem] p-6 lg:p-10 border border-white/5 relative overflow-hidden group hover:bg-primary-blue hover:border-primary-blue transition-all duration-700 flex flex-col shadow-2xl", isUrdu && "text-right")}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/0 to-transparent group-hover:from-black/10 transition-colors duration-500 pointer-events-none"></div>
                
                <div className={cn("w-16 h-16 rounded-2xl bg-primary-blue flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black shadow-[0_0_30px_rgba(0,112,243,0.3)] transition-all duration-500 text-white", isUrdu && "ml-auto")}>
                    <ArrowRight className={cn("w-8 h-8 -rotate-90", isUrdu && "rotate-[90deg]")} />
                </div>

                <div className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  <h3 className="text-white group-hover:text-black font-black text-3xl lg:text-4xl uppercase tracking-tighter mb-4">
                     {isUrdu ? "ہم بیچتے ہیں" : "WE SELL"}
                  </h3>
                  <p className={cn("text-gray-400 group-hover:text-black/80 text-sm lg:text-base font-bold leading-relaxed mb-8 flex-grow", isUrdu && "urdu-text")}>
                    {isUrdu ? "بہترین معیار کا سکریپ اور ری سائیکل شدہ مٹیریل براہ راست ہم سے حاصل کریں۔" : "Direct access to high-grade liquidated stock and repurposed office assets."}
                  </p>
                  <a href="https://wa.me/923152227331" target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs mt-auto border-b-2 border-primary-blue/20 pb-1 group-hover:border-black/30", isUrdu && "flex-row-reverse")}>
                     {isUrdu ? "اسٹاک دیکھیں" : "GET STOCK INFO"} <ArrowRight className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                  </a>
                </div>
             </div>

          </motion.div>
        </div>
      </section>

      <ProcessSection />
      <AboutUs />
      <ServiceGrid />
      <ScrapGrid />
      <QuoteSection />
      <CustomerReviews />
      
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
        <div className="absolute -left-40 top-20 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent rounded-full pointer-events-none"></div>
        
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

              {/* QUICK WHATSAPP LINK */}
              <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl inline-flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <PackageOpen className="w-6 h-6 text-white" />
                   </div>
                   <div className="text-left">
                      <div className="text-white font-black text-sm uppercase tracking-wider">Contact for Rates & Info</div>
                      <div className="text-green-400 font-bold">24/7 WhatsApp Support</div>
                   </div>
                </div>
                <div className="h-full w-px bg-white/10 hidden md:block"></div>
                <a 
                  href="https://wa.me/923152227331" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl font-black text-white hover:text-green-400 transition-colors"
                >
                  0331314853
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-[#111] p-6 sm:p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent -mr-32 -mt-32 group-hover:from-yellow-500/20 transition-colors duration-700"></div>
              
              <h3 className={cn("text-2xl lg:text-3xl font-black text-white mb-10 tracking-wider relative z-10", isUrdu && "urdu-text")}>
                {isUrdu ? "ہماری ماہرانہ خدمات" : "Core Specializations"}
              </h3>
              
              <ul className={cn("space-y-6 relative z-10", isUrdu && "urdu-text text-right")}>
                {[
                  { en: "Professional Lifting & Shifting Services", ur: "پروفیشنل لفٹنگ اور شفٹنگ سروسز", bold: true },
                  { en: "Industrial Scrap Acquisition", ur: "صنعت سکریپ کی خرید" },
                  { en: "Office Dismantling & Liquidation", ur: "آفس ڈسمینٹلنگ اور لیکویڈیشن" },
                  { en: "Premium Furniture Liquidators", ur: "استعمال شدہ دفتری فرنیچر" },
                  { en: "Corporate Site Renovation", ur: "کارپوریٹ سائٹ رینوویشن" },
                  { en: "Enterprise Waste Management", ur: "کارپوریٹ ویسٹ مینجمنٹ" }
                ].map((item, i) => (
                  <li key={i} className={cn("flex items-center gap-5 group/item text-sm md:text-base font-semibold", isUrdu && "flex-row-reverse", item.bold ? "text-yellow-400" : "text-gray-500")}>
                    <span className={cn("w-2.5 h-2.5 rounded-sm shrink-0 transition-all", item.bold ? "bg-yellow-400 scale-125 shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "bg-white/10 group-hover/item:bg-yellow-400 group-hover/item:scale-125 group-hover/item:shadow-[0_0_10px_rgba(234,179,8,0.5)]")}></span>
                    <span className={cn("transition-colors tracking-wide", item.bold ? "text-yellow-400 font-extrabold" : "group-hover:text-white")}>{isUrdu ? item.ur : item.en}</span>
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
      {/* FAQ SECTION */}
      <section className="bg-[#050505] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className={cn("text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter", isUrdu && "urdu-text")}>
              {isUrdu ? "عام طور پر پوچھے جانے والے سوالات" : "Frequently Asked Questions"}
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: isUrdu ? "ڈیسنٹ ڈسپوزل کس قسم کا سکریپ خریدتا ہے؟" : "What kind of scrap does Decent Disposal buy?",
                a: isUrdu ? "ہم ہر قسم کا صنعتی سکریپ بشمول تانبا، لوہا، ایلومینیم، پرانی مشینری اور دفتری فرنیچر خریدتے ہیں۔" : "We purchase all types of industrial scrap, including copper, iron, aluminum, heavy machinery, IT equipment, and corporate office furniture."
              },
              {
                q: isUrdu ? "کیا آپ پورے کراچی میں خدمات فراہم کرتے ہیں؟" : "Do you provide services across all of Karachi?",
                a: isUrdu ? "جی ہاں، ہم کراچی کے تمام علاقوں بشمول سائٹ، لانڈھی، کورنگی اور پورٹ قاسم میں فوری خدمات فراہم کرتے ہیں۔" : "Yes, we cover all major industrial and commercial hubs in Karachi, including SITE, Landhi, Korangi, and Port Qasim, with immediate site visits."
              },
              {
                q: isUrdu ? "رینوویشن کے لیے آپ کے ریٹس کیا ہیں؟" : "What are your rates for office renovation?",
                a: isUrdu ? "ہمارے ریٹس پروجیکٹ کی نوعیت پر منحصر ہیں، لیکن ہم ری سائیکل مٹیریل کے استعمال سے آپ کا 50% تک خرچ بچاتے ہیں۔" : "Our renovation rates are project-specific. However, we specialize in high-quality, low-budget execution by smartly repurposing materials, saving you up to 50% compared to new builds."
              },
              {
                q: isUrdu ? "ادائیگی کا طریقہ کار کیا ہے؟" : "What is your payment process?",
                a: isUrdu ? "ہم شفاف ادائیگیوں پر یقین رکھتے ہیں اور فوری بینک ٹرانسفر یا کیش فراہم کرتے ہیں۔" : "We believe in 100% financial transparency. Payments are processed instantly via bank transfer or verified cash receipts upon material lifting."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-yellow-500/30 transition-all group"
              >
                <h3 className={cn("text-lg md:text-xl font-bold text-white mb-3 flex items-start gap-4", isUrdu && "flex-row-reverse text-right")}>
                  <span className="text-yellow-500 font-black">Q.</span>
                  <span className={cn(isUrdu && "urdu-text")}>{faq.q}</span>
                </h3>
                <p className={cn("text-gray-400 leading-relaxed pl-9", isUrdu && "pr-9 pl-0 text-right urdu-text")}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-black">Still have questions?</p>
            <a 
              href="https://wa.me/923152227331" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-500 text-black px-10 py-5 rounded-2xl font-black uppercase text-sm hover:bg-yellow-400 transition-all shadow-xl hover:shadow-yellow-500/20"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
