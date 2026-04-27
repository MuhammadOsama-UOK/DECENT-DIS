import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isResizing) handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 bg-card-bg/20 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className={cn("space-y-6", isUrdu && "text-right lg:order-2")}>
          <h2 className={cn("text-4xl font-extrabold text-primary-blue", isUrdu && "urdu-text text-5xl")}>
             {isUrdu ? "تبدیلی جو آپ دیکھ سکتے ہیں" : "Transformations You Can Feel"}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
             From dilapidated warehouses to modern corporate headquarters. Witness the Decent Disposal difference in our recent renovation project in I.I. Chundrigar Road.
          </p>
          <ul className={cn("space-y-3 font-medium", isUrdu && "urdu-text")}>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-blue" />
              Complete Civil & Structural Changes
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-blue" />
              High-Gloss Italian Flooring
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary-blue" />
              Smart Lighting Automation
            </li>
          </ul>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[400px] md:h-[500px] rounded-card overflow-hidden cursor-ew-resize shadow-2xl lg:order-1"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsResizing(true)}
          onTouchStart={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
          onTouchEnd={() => setIsResizing(false)}
          onMouseLeave={() => setIsResizing(false)}
        >
          {/* After View */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80')` }}
          >
            <div className="absolute top-4 right-4 bg-primary-blue text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">After</div>
          </div>

          {/* Before View */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1549443542-1e7939339396?auto=format&fit=crop&q=80')`,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
            }}
          >
             <div className="absolute top-4 left-4 bg-gray-800 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">Before</div>
          </div>

          {/* Slider line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-md flex items-center justify-center"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg border-4 border-white/20">
               <div className="flex gap-1">
                 <div className="w-1 h-3 bg-black/20 rounded-full" />
                 <div className="w-1 h-3 bg-black/50 rounded-full" />
                 <div className="w-1 h-3 bg-black/20 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
