import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, CheckCircle, Smartphone, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

export default function QuoteSection() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <section className="relative w-full py-24 lg:py-32 flex items-center justify-center overflow-hidden font-poppins">
      {/* Background with Zoom Animation */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-[zoomBg_20s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=1600')" }}
      />
      <div className="absolute inset-0 bg-[#050505]/80 z-10" />

      <div className={cn("relative z-20 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 gap-12 lg:gap-20 items-stretch", isUrdu && "lg:flex-row-reverse")}>
        
        {/* LEFT: SEO CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full lg:flex-[1.2] flex flex-col"
        >
          <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl h-full flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-[30px] rounded-full pointer-events-none group-hover:bg-yellow-500/30 transition-all duration-700"></div>
            
            <div className={cn("flex items-center gap-3 mb-6", isUrdu && "justify-end")}>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-500 font-bold tracking-[0.2em] text-xs uppercase">{isUrdu ? "ماہر خدمات" : "Specialization"}</span>
            </div>

            <h2 className={cn("text-3xl md:text-4xl font-black mb-8 leading-[1.2] tracking-tight text-white uppercase font-outfit", isUrdu && "text-right urdu-text leading-tight")}>
              {isUrdu ? "پریمیم رینوویشن اور انٹیرئیر ماہرین" : "Premium Renovation & Interior Specialists"}
            </h2>
            
            <div className={cn("space-y-6 text-gray-400 font-medium", isUrdu && "text-right urdu-text")}>
              <p className="text-base md:text-lg leading-relaxed">
                {isUrdu ? "اپنی کمرشل یا رہائشی پراپرٹی کو جدید انٹیرئیر سلوشنز کے ساتھ بہتر بنائیں۔" : "Elevate your residential or commercial property with industry-leading interior solutions. We specialize in "} 
                <strong className={cn("text-white block mt-2", isUrdu && "inline mt-0")}>{isUrdu ? "ہم کسٹم گلاس پارٹیشنز، بہترین ووڈ ورک، لگژری فلورنگ، اور جدید سیلنگ ڈیزائن میں مہارت رکھتے ہیں۔" : "custom glass partitions, bespoke woodwork, luxury flooring, and modern designer ceilings."}</strong>
              </p>
              
              <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-white/10", isUrdu && "rtl")}>
                {[
                  { en: "Top-Tier Materials", ur: "بہترین مواد کشش کے لیے", desc: "Ensuring durability and premium aesthetics." },
                  { en: "Expert Craftsmanship", ur: "ماہرانہ دستکاری", desc: "Decades of combined experience." },
                  { en: "On-Time Delivery", ur: "بروقت کام مکمل", desc: "Strict adherence to project timelines." },
                  { en: "Affordable Excellence", ur: "مناسب قیمت", desc: "Competitive pricing guaranteed." }
                ].map((item, idx) => (
                  <div key={idx} className={cn("flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors", isUrdu && "flex-row-reverse")}>
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className={cn("flex flex-col", isUrdu && "items-end text-right")}>
                      <span className="text-white font-bold text-sm tracking-wide">{isUrdu ? item.ur : item.en}</span>
                      {!isUrdu && <span className="text-xs text-gray-500 mt-1">{item.desc}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: CONTACT ACTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full lg:flex-[0.8] flex flex-col h-full gap-6"
        >
          {/* Quote Mini Card */}
          <div className={cn("relative p-8 bg-yellow-500/90 rounded-[2rem] overflow-hidden group shadow-[0_0_40px_rgba(234,179,8,0.2)]", isUrdu && "text-right")}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[20px] rounded-full pointer-events-none"></div>
            <p className={cn("text-black text-xl lg:text-2xl font-black leading-snug tracking-tight font-outfit uppercase z-10 relative", isUrdu && "urdu-text leading-tight")}>
              {isUrdu 
                ? "ہم جدید شیشے اور لکڑی کے کام سے آپ کے دفاتر کو بدلتے ہیں۔" 
                : "Transforming workspaces with premium glass & wood aesthetics. Fast & reliable."}
            </p>
          </div>

          {/* WhatsApp Connect Card */}
          <div className="flex-grow rounded-[2rem] bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-white/10 transition-all shadow-xl">
             <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
             
             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-500 relative">
               <div className="absolute inset-0 bg-green-500 blur-[20px] opacity-20"></div>
               <MessageCircle className="w-10 h-10 text-green-500 relative z-10" />
             </div>
             
             <h3 className="text-white font-black text-3xl uppercase tracking-tighter mb-2 font-outfit">Contact Expert</h3>
             <p className="text-gray-400 text-sm font-medium mb-8">Discuss your project instantly on WhatsApp</p>
             
             <a 
               href="https://wa.me/923152227331" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="bg-green-500 text-black w-full py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
             >
               Start Chat <ArrowRight className="w-4 h-4" />
             </a>
             <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-widest">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               Available 24/7
             </div>
          </div>
        </motion.div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes zoomBg { from { transform: scale(1); } to { transform: scale(1.1); } }
      `}</style>
    </section>
  );
}
