import React from 'react';
import { cn } from '../lib/utils';
import { Recycle, Building2 } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  isUrdu?: boolean;
}

export default function BrandLogo({ className, onClick, isUrdu }: BrandLogoProps) {
  return (
    <div 
      onClick={onClick}
      className={cn("flex flex-row items-center gap-3 cursor-pointer select-none group", className)}
    >
      <div className="bg-white rounded-xl py-1.5 px-3 shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
        <div className="flex items-end text-yellow-500 font-black leading-none tracking-tighter relative">
          <span className="text-[2.2rem] lg:text-[2.6rem] flex items-center drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <span className="relative inline-flex items-center justify-center">
              D
              <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                <Recycle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white" strokeWidth={5} />
                <Recycle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] text-yellow-500" strokeWidth={2.5} />
              </div>
            </span>
            <span className="relative -ml-1 inline-flex items-center justify-center">
              D
              <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white" strokeWidth={5} />
                <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] text-yellow-500" strokeWidth={2.5} />
              </div>
            </span>
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-start">
        <h1 className="text-yellow-500 font-black text-[13px] lg:text-[15px] tracking-[0.2em] uppercase leading-none font-outfit">
          DECENT
        </h1>
        <h2 className="text-yellow-500 font-bold text-[8px] lg:text-[9.5px] tracking-[0.15em] uppercase leading-none mt-1">
          DISPOSAL
        </h2>
      </div>
    </div>
  );
}
