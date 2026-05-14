import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';
import { ArrowRight, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export default function SitemapPage() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const links = [
    { name: 'Home', path: '/', ur: 'ہوم' },
    { name: 'Our Process', path: '/process', ur: 'ہمارا طریقہ کار' },
    { name: 'Portfolio', path: '/portfolio', ur: 'پورٹ فولیو' },
    { name: 'About Company', path: '/about-company', ur: 'کمپنی کے بارے میں' },
    { name: 'Latest Scrap Rates', path: '/scrap-rates', ur: 'سکریپ کے ریٹس' },
    { name: 'Blog & Articles', path: '/blog', ur: 'بلاگ' },
    { name: 'Get a Quote', path: '/quote', ur: 'کوٹیشن حاصل کریں' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 font-poppins">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16 border-l-4 border-yellow-500 pl-8">
          <h1 className={cn("text-4xl md:text-6xl font-black text-white italic uppercase mb-4", isUrdu && "urdu-text text-right mr-8 border-l-0 border-r-4 pl-0 pr-8")}>
            {isUrdu ? "سائٹ میپ" : "Sitemap"}
          </h1>
          <p className={cn("text-gray-400 text-lg", isUrdu && "text-right urdu-text")}>
            {isUrdu ? "ڈی سینٹ ڈسپوزل کی تمام اہم لنکس اور صفحات کی فہرست۔" : "Complete directory of all pages and services provided by Decent Disposal Karachi."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Pages */}
          <section className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem]">
            <h2 className={cn("text-xl font-bold text-yellow-500 uppercase tracking-widest mb-8 flex items-center gap-3", isUrdu && "flex-row-reverse")}>
              <Globe className="w-5 h-5" />
              {isUrdu ? "اہم صفحات" : "Core Navigation"}
            </h2>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={cn("group flex items-center gap-4 text-gray-300 hover:text-white transition-colors py-2", isUrdu && "flex-row-reverse")}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500 transition-colors"></span>
                    <span className={cn("font-semibold text-lg", isUrdu && "urdu-text")}>
                      {isUrdu ? link.ur : link.name}
                    </span>
                    <ArrowRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all", isUrdu && "rotate-180")} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact & Support */}
          <section className="flex flex-col gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem]">
              <h2 className={cn("text-xl font-bold text-green-500 uppercase tracking-widest mb-8 flex items-center gap-3", isUrdu && "flex-row-reverse")}>
                <MapPin className="w-5 h-5" />
                {isUrdu ? "رابطہ کریں" : "Direct Channels"}
              </h2>
              <div className={cn("space-y-6", isUrdu && "text-right")}>
                <div className="group">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">WhatsApp Support</p>
                  <a href="https://wa.me/923152227331" className="text-white font-black text-xl hover:text-green-500 transition-colors tracking-tight italic">+92 315-2227331</a>
                </div>
                <div className="group">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Office Location</p>
                  <p className={cn("text-white font-bold leading-relaxed", isUrdu && "urdu-text")}>
                    {isUrdu ? "کراچی، پاکستان - کارپوریٹ سیکٹر" : "Karachi, Pakistan - Corporate Industrial Hub"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-10 rounded-[2.5rem] shadow-xl text-black">
               <CheckCircle2 className="w-8 h-8 mb-4" />
               <h3 className={cn("text-2xl font-black uppercase italic leading-none mb-2", isUrdu && "urdu-text")}>
                 {isUrdu ? "حلال رزق" : "Halal Business"}
               </h3>
               <p className={cn("font-bold text-sm leading-snug", isUrdu && "urdu-text")}>
                 {isUrdu ? "مکمل دیانتداری اور شفافیت کے ساتھ آپ کے سکریپ کی خرید و فروخت۔" : "Committed to 100% transparency and fair valuation in every corporate liquidation."}
               </p>
            </div>
          </section>
        </div>

        <footer className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
           <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Decent Disposal © 2026</p>
           <div className="flex gap-8">
              <span className="text-[10px] font-black uppercase tracking-widest">Sitemap v2.0</span>
              <span className="text-[10px] font-black uppercase tracking-widest">SEO Optimized</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
