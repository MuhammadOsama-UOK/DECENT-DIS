import HeroSlider from './HeroSlider';
import AboutUs from './AboutUs';
import ServiceGrid from './ServiceGrid';
import ScrapSection from './ScrapSection';
import QuoteSection from './QuoteSection';
import ProcessSection from './ProcessSection';
import { motion } from 'motion/react';

export default function HomePage() {
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

      
    </main>
  );
}
