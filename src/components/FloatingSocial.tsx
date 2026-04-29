import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, X, Facebook, Instagram, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { useSiteSettings } from '@/src/lib/SiteContext';

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(true);
  const siteSettings = useSiteSettings();

  const phone = siteSettings?.phone1 || "0331-3141853";
  const whatsappNumber = "923152227331";
  const message = encodeURIComponent("Hi Decent Disposal, I am interested in your premier services.");

  return (
    <>
      {/* Floating Social Sidebar (Design specific positions) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[9999]">
        <SocialBubble icon={<Facebook className="w-4 h-4" />} href="#" theme="blue" />
        <SocialBubble icon={<Linkedin className="w-4 h-4" />} href="#" theme="green" />
        <SocialBubble icon={<Instagram className="w-4 h-4" />} href="#" theme="yellow" />
      </div>

      {/* Floating WhatsApp Widget */}
      <div className="fixed right-4 bottom-16 md:right-8 md:bottom-12 z-[9999] flex items-center gap-3">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white text-black px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-tighter shadow-2xl relative hidden sm:block border border-gray-100"
        >
          Instant Scrap Quote?
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
        </motion.div>
        
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 cursor-pointer"
        >
          <MessageCircle className="w-8 h-8 text-white fill-current" />
        </motion.a>
      </div>
    </>
  );
}

function SocialBubble({ icon, href, theme }: { icon: React.ReactNode, href: string, theme: 'blue' | 'green' | 'yellow' }) {
  const themes = {
    blue: 'hover:bg-primary-blue',
    green: 'hover:bg-primary-green',
    yellow: 'hover:bg-primary-yellow'
  };

  return (
    <a 
      href={href} 
      className={cn(
        "w-10 h-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center transition-colors text-gray-300 hover:text-white",
        themes[theme]
      )}
    >
      {icon}
    </a>
  );
}
