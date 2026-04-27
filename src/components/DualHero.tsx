import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function DualHero() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div id="dual-hero" className="relative h-[85vh] min-h-[600px] flex overflow-hidden border-b border-white/10">

      <div className={cn("container mx-auto h-full flex lg:flex-row flex-col overflow-hidden relative", isUrdu && "direction-rtl")}>
        {/* Left: Renovation (Blue Theme) */}
        <section className="group relative flex-1 overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
          
          <div className="relative z-20 h-full p-12 flex flex-col justify-end">
            <div className="glass-panel p-8 rounded-card-large max-w-md transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-primary-blue text-xs font-bold tracking-widest uppercase mb-4 block">Luxury Interiors</span>
              <h2 className={cn("text-5xl font-black mb-4 leading-[0.9] tracking-tighter", isUrdu && "urdu-text text-6xl leading-[0.9]")}>
                {t('hero_renovation_title')}
              </h2>
              <p className={cn("text-gray-300 text-sm mb-6", isUrdu && "urdu-text text-base opacity-80")}>
                {t('hero_renovation_sub')}
              </p>
              <div className="flex gap-4">
                <button className="bg-primary-blue px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-blue/30 transform hover:scale-105 transition-all text-white">
                  {t('view_projects')}
                </button>
                <button className="border border-white/30 px-6 py-3 rounded-xl font-bold text-sm backdrop-blur-sm hover:bg-white/10 transition-all">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Scrap (Green Theme) */}
        <section className="group relative flex-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />

          <div className="relative z-20 h-full p-12 flex flex-col justify-end">
            <div className="glass-panel p-8 rounded-card-large max-w-md transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-primary-green text-xs font-bold tracking-widest uppercase mb-4 block">Industrial Disposal</span>
              <h2 className={cn("text-5xl font-black mb-4 leading-[0.9] text-primary-green tracking-tighter", isUrdu && "urdu-text text-6xl leading-[0.9]")}>
                {t('hero_scrap_title')}
              </h2>
              <p className={cn("text-gray-300 text-sm mb-6", isUrdu && "urdu-text text-base opacity-80")}>
                {t('hero_scrap_sub')}
              </p>
              <div className="flex gap-4">
                <button className="bg-primary-green text-black px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/30 transform hover:scale-105 transition-all">
                  {t('rates')}
                </button>
                <button className="bg-whatsapp text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/40 hover:scale-105 transition-all">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
