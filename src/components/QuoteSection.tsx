import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, CheckCircle } from 'lucide-react';

export default function QuoteSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-sans py-24 px-4 bg-slate-900">
      {/* Background with Zoom Animation */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-[zoomBg_20s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=1600')" }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col lg:flex-row w-full max-w-7xl gap-12 items-center justify-between">
        
        {/* LEFT: SEO CONTENT */}
        <div className="w-full lg:flex-[1.2] animate-fadeInUp">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[24px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight text-emerald-400">Premium Renovation & Interior Specialists</h2>
            
            <div className="space-y-6 text-gray-200">
              <p className="text-lg leading-relaxed">
                Elevate your residential or commercial property with industry-leading interior solutions. We specialize in <strong className="text-white">custom glass partitions, bespoke woodwork, luxury flooring, and modern false ceilings</strong>. 
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><strong>Top-Tier Materials:</strong> Ensuring durability and premium aesthetics.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><strong>Expert Craftsmanship:</strong> Decades of combined experience.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><strong>On-Time Delivery:</strong> Strict adherence to project timelines.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p><strong>Affordable Excellence:</strong> Competitive pricing guaranteed.</p>
                </div>
              </div>
              
              <p className="text-lg pt-4 leading-relaxed italic opacity-90 border-t border-white/10">
                "Your vision, flawlessly executed. Contact our design experts today to transform your space."
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="w-full lg:flex-[0.8] flex flex-col gap-10 text-center lg:text-left">
          <div className="p-6 border-l-4 border-emerald-500 bg-white/5 backdrop-blur-sm rounded-r-xl">
            <p className="text-white text-xl font-medium leading-relaxed italic">
              We transform spaces with modern glass and wood work. Premium renovation services tailored to your lifestyle. Fast, reliable, and affordable.
            </p>
          </div>

          <div className="w-56 h-96 mx-auto lg:mx-0 rounded-[35px] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-4 animate-[float_4s_ease-in-out_infinite]">
            <a href="https://wa.me/923313141853" target="_blank" rel="noopener" className="flex flex-col items-center text-white hover:text-emerald-400 transition-colors">
              <MessageCircle className="w-20 h-20 text-green-500" />
              <span className="font-black text-xl mt-2 uppercase tracking-tight">WhatsApp Us</span>
              <p className="text-xs opacity-70 mt-1 uppercase tracking-widest">Available 24/7</p>
            </a>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes zoomBg { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      `}</style>
    </section>
  );
}
