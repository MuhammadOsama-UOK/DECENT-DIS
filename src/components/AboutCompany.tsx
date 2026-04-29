import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Shield, Target, Trophy, Building2, HardHat, Briefcase } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const STATS = [
  { value: "11+", label: "Years Experience" },
  { value: "150+", label: "Projects Completed" },
  { value: "50+", label: "Corporate Clients" },
  { value: "100%", label: "Client Satisfaction" },
];

const PLATINUM_CLIENTS = [
  "State Bank of Pakistan",
  "Aisha Steel Mills",
  "National Foods Limited",
  "Pakistan Stock Exchange"
];

export default function AboutCompany() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-20 pb-12 font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] selection:bg-emerald-500 selection:text-white">
      
      {/* Hero Header */}
      <section className="max-w-[1200px] mx-auto px-6 mb-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-widest mb-4"
        >
          <Building2 className="w-4 h-4" /> Company Overview
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn("text-5xl md:text-6xl font-black text-[#111] mb-4 tracking-tight", isUrdu && "urdu-text")}
        >
          {isUrdu ? "ہمارے بارے میں" : "Leading with "} <span className="text-emerald-600">{isUrdu ? "جانیے" : "Excellence"}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn("text-lg md:text-xl text-[#555] max-w-3xl mx-auto leading-relaxed", isUrdu && "urdu-text")}
        >
          {isUrdu 
            ? "ڈی سینٹ ڈسپوزل کے ایک مستند ڈیلر کے طور پر ہم سالوں سے کارپوریٹ سیکٹر کو اپنی بہترین خدمات فراہم کر رہے ہیں۔ ہمارا مقصد شفافیت اور پائیداری ہے۔"
            : "Bridging the gap between cutting-edge office renovations and professional scrap liquidation. As a trusted dealer to Pakistan's biggest organizations, we deliver perfection at every step."}
        </motion.p>
      </section>

      {/* Leadership Section */}
      <section className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#222] uppercase tracking-tight">Our Leadership</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Muhammad Adnan - Founder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-600 text-xs font-black uppercase tracking-widest mb-4 w-fit">
              <Briefcase className="w-3 h-3" /> Founder & Owner
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black text-[#111] mb-2 font-montserrat">Muhammad Adnan</h3>
            <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4">Trusted Scrap Dealer & Renovation Contractor</p>
            
            <p className={cn("text-[#555] text-base leading-loose mb-6", isUrdu && "urdu-text")}>
              {isUrdu 
                ? "محمد عدنان — قابل اعتماد سکریپ ڈیلر اور رینوویشن کنٹریکٹر، 11 سال سے زائد تجربے کے ساتھ سٹیٹ بینک آف پاکستان اور عائشہ سٹیل ملز جیسے اعلیٰ اداروں کو خدمات فراہم کر رہے ہیں۔"
                : "Muhammad Adnan — A trusted Scrap Dealer & Renovation Contractor with 11+ years of experience, serving top organizations like State Bank of Pakistan and Aisha Steel Mills."}
            </p>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#888] mb-4">Trusted By Elite Organizations</h4>
              <div className="flex flex-wrap gap-3">
                {PLATINUM_CLIENTS.map((client, idx) => (
                  <span key={idx} className="bg-white px-4 py-2 rounded-lg text-sm font-bold text-[#333] shadow-sm border border-gray-100 flex items-center gap-2">
                    <Shield className="w-3 h-3 text-emerald-500" /> {client}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tanveer Ahmed - CEO */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#050505] text-white rounded-[32px] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white text-xs font-black uppercase tracking-widest mb-4 w-fit border border-white/10">
                <Target className="w-3 h-3" /> Chief Executive Officer
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 font-montserrat">Tanveer Ahmed</h3>
              <p className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-4">CEO | Decent Disposal & Renovation Expert</p>
              
              <p className={cn("text-gray-400 text-base leading-loose mb-6", isUrdu && "urdu-text")}>
                {isUrdu
                  ? "تنویر احمد کی دور اندیش قیادت میں ہماری کمپنی نے نمایاں ترقی کی ہے۔ وہ پائیداری اور کوالٹی کے اعلیٰ معیار پر یقین رکھتے ہیں جس کی بدولت ہم کارپوریٹ سیکٹر میں ایک قابل اعتماد نام بن چکے ہیں۔"
                  : "Under the visionary leadership of Tanveer Ahmed, our company has scaled to become Pakistan's top-rated interior renovation and scrap management firm. His commitment to excellence, strategic growth, and sustainable practices drives our mission to transform corporate sectors into modern powerhouses while ensuring strict eco-friendly disposal protocols."}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
                  <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
                  <h4 className="text-white font-bold text-lg">Visionary Leader</h4>
                  <p className="text-xs text-gray-400 mt-1">Pioneering sustainable business practices.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
                  <HardHat className="w-8 h-8 text-yellow-500 mb-3" />
                  <h4 className="text-white font-bold text-lg">Process Expert</h4>
                  <p className="text-xs text-gray-400 mt-1">Ensuring flawless execution & safety.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-600 py-12 text-white mb-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/20">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-4xl md:text-5xl font-black mb-2">{stat.value}</h3>
              <p className="text-emerald-100 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[800px] mx-auto text-center px-6">
        <h2 className="text-3xl font-black text-[#111] mb-6">Ready to work with the best?</h2>
        <p className="text-[#666] mb-8 leading-relaxed">
          Whether you are looking for a complete office overhaul, or need a trusted partner for industrial scrap buying, we have the expertise to deliver.
        </p>
        <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111] hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30">
          Get in Touch Today
        </Link>
      </section>

    </div>
  );
}
