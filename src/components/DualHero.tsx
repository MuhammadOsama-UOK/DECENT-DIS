import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function DualHero() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div id="dual-hero" className="relative lg:h-[85vh] min-h-[100vh] flex flex-col lg:flex-row overflow-hidden border-b border-white/10">

      <div className={cn("container mx-auto h-full flex flex-col lg:flex-row overflow-hidden relative", isUrdu && "direction-rtl")}>
        {/* Left: Renovation (Blue Theme) */}
        <section className="group relative flex-1 min-h-[50vh] lg:min-h-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
          
          <div className="relative z-20 h-full p-6 md:p-12 flex flex-col justify-end">
            <div className="glass-panel p-6 md:p-8 rounded-card-large max-w-md transform group-hover:translate-y-0 lg:group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-primary-blue text-xs font-bold tracking-widest uppercase mb-4 block">Luxury Interiors</span>
              <h2 className={cn("text-4xl md:text-5xl font-black mb-4 leading-[1.1] tracking-tighter", isUrdu && "urdu-text text-5xl leading-[1.1]")}>
                {t('hero_renovation_title')}
              </h2>
              <p className={cn("text-gray-300 text-sm mb-6", isUrdu && "urdu-text text-base opacity-80")}>
                {t('hero_renovation_sub')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-blue px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-blue/30 transform hover:scale-105 transition-all text-white text-center">
                  {t('view_projects')}
                </button>
                <button className="border border-white/30 px-6 py-3 rounded-xl font-bold text-sm backdrop-blur-sm hover:bg-white/10 transition-all text-center">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Scrap (Green Theme) */}
        <section className="group relative flex-1 min-h-[50vh] lg:min-h-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />

          <div className="relative z-20 h-full p-6 md:p-12 flex flex-col justify-end">
            <div className="glass-panel p-6 md:p-8 rounded-card-large max-w-md transform group-hover:translate-y-0 lg:group-hover:-translate-y-2 transition-transform duration-500">
              <span className="text-primary-green text-xs font-bold tracking-widest uppercase mb-4 block">Industrial Disposal</span>
              <h2 className={cn("text-4xl md:text-5xl font-black mb-4 leading-[1.1] text-primary-green tracking-tighter", isUrdu && "urdu-text text-5xl leading-[1.1]")}>
                {t('hero_scrap_title')}
              </h2>
              <p className={cn("text-gray-300 text-sm mb-6", isUrdu && "urdu-text text-base opacity-80")}>
                {t('hero_scrap_sub')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-green text-black px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-green/30 transform hover:scale-105 transition-all text-center">
                  {t('rates')}
                </button>
                <button className="bg-whatsapp text-white px-6 py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 shadow-lg shadow-green-900/40 hover:scale-105 transition-all text-center">
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
