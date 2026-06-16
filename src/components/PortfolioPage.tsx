import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { ShieldCheck, Zap, CreditCard, Building2, Landmark, CheckCircle2, Award, Briefcase, Globe, TrendingUp, ArrowLeft } from 'lucide-react';

const TRUSTED_PARTNERS_CONTENT = {
  en: {
    title: "Our Trusted Partners & Corporate Network",
    subtitle: "A legacy of trust with Pakistan's leading national institutions and multinational corporations.",
    description: "At Decent Disposal, we have built a legacy of trust with Pakistan's top-tier organizations, including the <strong>National Bank of Pakistan (NBP)</strong>, <strong>NADRA</strong>, <strong>State Bank of Pakistan (SBP)</strong>, <strong>Pakistan Stock Exchange (PSX)</strong>, <strong>K-Electric (KE)</strong>, <strong>Pakistan International Airlines (PIA)</strong>, and numerous multinational corporations.",
    highlights: [
      { 
        icon: Zap, 
        title: "Instant Payments", 
        text: "Seamless financial processing with immediate bank transfers and verified receipts." 
      },
      { 
        icon: ShieldCheck, 
        title: "Absolute Security", 
        text: "Fully certified disposal processes ensuring zero liability and complete data privacy." 
      }
    ]
  },
  ur: {
    title: "ہمارے قابل اعتماد شراکت دار اور کارپوریٹ نیٹ ورک",
    subtitle: "پاکستان کے معروف قومی اداروں اور ملٹی نیشنل کارپوریشنز کے ساتھ اعتماد کی ایک مضبوط میراث۔",
    description: "ڈیسنٹ ڈسپوزل میں، ہم نے پاکستان کی اعلیٰ ترین تنظیموں کے ساتھ اعتماد کی ایک مضبوط میراث بنائی ہے، جن میں <strong>نیشنل بینک آف پاکستان (NBP)</strong>، <strong>نادرا (NADRA)</strong>، <strong>اسٹیٹ بینک آف پاکستان (SBP)</strong>، <strong>پاکستان اسٹاک ایکسچینج (PSX)</strong>، <strong>کے الیکٹرک (KE)</strong> اور <strong>پی آئی اے (PIA)</strong> شامل ہیں۔",
    highlights: [
      { 
        icon: Zap, 
        title: "فوری ادائیگی", 
        text: "فوری بینک ٹرانسفر اور قابل تصدیق رسیدوں کے ساتھ بغیر کسی رکاوٹ کے مالیاتی عمل۔" 
      },
      { 
        icon: ShieldCheck, 
        title: "مکمل سیکیورٹی", 
        text: "مکمل طور پر تصدیق شدہ ٹھکانے لگانے کے عمل جو صفر ذمہ داری اور مکمل ڈیٹا پرائیویسی کو یقینی بناتے ہیں۔" 
      }
    ]
  }
};

const PARTNERS = [
  { name: 'NBP', label: 'National Bank', icon: Landmark },
  { name: 'NADRA', label: 'National Database', icon: ShieldCheck },
  { name: 'SBP', label: 'State Bank', icon: Landmark },
  { name: 'PSX', label: 'Stock Exchange', icon: TrendingUp },
  { name: 'KE', label: 'K-Electric', icon: Zap },
  { name: 'PIA', label: 'Airlines', icon: Globe },
  { name: 'MEEZAN', label: 'Meezan Bank', icon: Landmark },
  { name: 'SBC', label: 'Standard Chartered', icon: Briefcase },
  { name: 'MCB', label: 'MCB Bank', icon: Award },
];

const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', // Modern Office
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', // Office renovation
  'https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?uto=format&fit=crop&w=800&q=80', // Clean office transformation
  'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=500&auto=format&fit=crop&w=800&q=80'  // Premium Wood/Floor
];

const SCRAP_PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1708791888109-8b0651e94170?w=500&auto=format&fitcrop&w=800&q=80', // Industrial Warehouse
  'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80', // Metal scrap
  'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80', // Factory Equipment
  'https://images.unsplash.com/photo-1762232621865-6353bef72f54?w=500&auto=format&fit=crop&w=800&q=80'  // Industrial yard
];

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isUrdu = i18n.language === 'ur';
  const content = isUrdu ? TRUSTED_PARTNERS_CONTENT.ur : TRUSTED_PARTNERS_CONTENT.en;

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 overflow-hidden selection:bg-primary-blue selection:text-white relative">
      <motion.button 
        whileHover={{ scale: 1.1, x: isUrdu ? 4 : -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
        className={cn(
          "fixed top-24 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20 backdrop-blur-md transition-all shadow-md flex items-center justify-center",
          isUrdu ? "right-4 md:right-8" : "left-4 md:left-8"
        )}
      >
        <ArrowLeft className={cn("w-5 h-5", isUrdu && "rotate-180")} />
      </motion.button>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-blue/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-green/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* HERO SECTION */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-green text-xs font-black tracking-[0.2em] uppercase mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Verified Corporate Network
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn("text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight", isUrdu && "urdu-text")}
          >
            {content.title}
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className={cn("text-base md:text-lg text-gray-400 leading-relaxed mb-10", isUrdu && "urdu-text")}
             dangerouslySetInnerHTML={{ __html: content.description }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {content.highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary-green" />
                </div>
                <div>
                  <h3 className={cn("text-white font-bold mb-1", isUrdu && "urdu-text")}>{item.title}</h3>
                  <p className={cn("text-gray-500 text-sm leading-relaxed", isUrdu && "urdu-text")}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINANCIAL TRANSPARENCY SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-24 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-primary-green/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 sm:p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-blue/5 rounded-full blur-[80px] -mr-48 -mt-48"></div>
            
            <div className="flex-1 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 text-primary-yellow font-black uppercase text-[10px] tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" />
                Verified Financial History
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-green">Payment Settlements</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mb-8">
                Our operations are backed by a transparent financial track record. From high-value corporate liquidations to small-scale clearances, we ensure instant processing and absolute security.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[
                  { label: 'Corporate Office Liquidation', value: 'PKR 2,450,000' },
                  { label: 'Bank Asset Recovery', value: 'PKR 890,000' },
                  { label: 'IT Infrastructure Scrap', value: 'PKR 420,000' },
                  { label: 'Telecom Site Clearance', value: 'PKR 150,000' },
                  { label: 'Warehouse Monthly Cycle', value: 'PKR 85,000' },
                  { label: 'Small Business Pickup', value: 'PKR 15,000' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="text-[10px] text-gray-500 uppercase font-black mb-1">{item.label}</div>
                    <div className="text-white font-black text-sm md:text-base">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-gray-500 text-xs italic">
                <Landmark className="w-4 h-4" />
                Verified bank proofs and transaction receipts are presented to clients upon request.
              </div>
            </div>
          </div>
        </motion.div>

        {/* PARTNER LOGO GRID */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Our Corporate Network</h2>
            <div className="w-12 h-[2px] bg-primary-blue mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center gap-4 group hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary-blue group-hover:bg-primary-blue/5 transition-all">
                  <partner.icon className="w-8 h-8 text-gray-400 group-hover:text-primary-blue group-hover:scale-110 transition-all" />
                </div>
                <div className="text-center">
                  <h3 className="text-white font-black text-xl tracking-tight leading-none mb-1">{partner.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-none">{partner.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RENOVATION GALLERY SECTION */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className={cn("text-3xl md:text-5xl font-black text-white mb-4", isUrdu && "urdu-text")}>
              {isUrdu ? "رینوویشن اور فیلڈ ایکسیلنس" : "Renovation Excellence"}
            </h2>
            <p className={cn("text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed", isUrdu && "urdu-text")}>
              {isUrdu 
                ? "ہم صرف کام نہیں کرتے، ہم مٹیریل کی بہترین ری سائیکلنگ اور اعلیٰ کاریگری کے ذریعے آپ کے پرانے دفاتر کو ایک نئی زندگی دیتے ہیں۔" 
                : "Real-world examples of our industrial site liquidations and premium corporate transformations across Karachi."}
            </p>
          </div>

          <div className="mb-16">
            <h3 className={cn("text-xl font-black text-primary-yellow uppercase tracking-[0.3em] mb-8 border-l-4 border-primary-yellow pl-4", isUrdu && "text-right border-l-0 border-r-4 pr-4")}>
              {isUrdu ? "صنعتی سکریپ پروجیکٹس" : "Industrial Scrap Projects"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { img: SCRAP_PROJECT_IMAGES[0], labelEn: "SITE Area Factory Liquidation", labelUr: "سائٹ ایریا فیکٹری لیکویڈیشن" },
                { img: SCRAP_PROJECT_IMAGES[1], labelEn: "Korangi Industrial Scrap Recovery", labelUr: "کورنگی انڈسٹریل سکریپ ریکوری" },
                { img: SCRAP_PROJECT_IMAGES[2], labelEn: "Port Qasim Warehouse Clearance", labelUr: "پورٹ قاسم ویئر ہاؤس کلیئرنس" },
                { img: SCRAP_PROJECT_IMAGES[3], labelEn: "Landhi Heavy Machinery Dismantling", labelUr: "لانڈھی ہیوی مشینری ڈس مینٹلنگ" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                >
                  <img 
                    src={item.img} 
                    alt={item.labelEn} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className={cn("text-white text-xs font-bold", isUrdu && "urdu-text text-right")}>{isUrdu ? item.labelUr : item.labelEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-16">
             <h3 className={cn("text-xl font-black text-primary-blue uppercase tracking-[0.3em] mb-8 border-l-4 border-primary-blue pl-4", isUrdu && "text-right border-l-0 border-r-4 pr-4")}>
               {isUrdu ? "آفس رینوویشن سائٹس" : "Office Renovation Sites"}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
               {[
                 { img: RENOVATION_IMAGES[0], labelEn: "I.I Chundrigar Road Office Overhaul", labelUr: "آئی آئی چندریگر روڈ آفس اوورہال" },
                 { img: RENOVATION_IMAGES[1], labelEn: "Gulshan-e-Iqbal Corporate Interior", labelUr: "گلشن اقبال کارپوریٹ انٹیریئر" },
                 { img: RENOVATION_IMAGES[2], labelEn: "Clifton Executive Suite Renovation", labelUr: "کلفٹن ایگزیکٹو سویٹ رینوویشن" },
                 { img: RENOVATION_IMAGES[3], labelEn: "Defence Phase 6 Boutique Office", labelUr: "ڈیفنس فیز 6 بوٹیک آفس" }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="group relative h-72 rounded-3xl overflow-hidden border border-white/10 bg-white/5"
                 >
                   <img 
                     src={item.img} 
                     alt={item.labelEn} 
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                     <span className="text-white font-bold text-xs uppercase tracking-widest mb-1">{isUrdu ? item.labelUr : item.labelEn}</span>
                     <span className="text-primary-blue font-black text-[10px] uppercase tracking-tighter">Premium Case Study #0{i+1}</span>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
          
          {/* PERSUASIVE CONTENT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: isUrdu ? "معیاری مواد" : "Superior Materials",
                desc: isUrdu ? "ہم بہترین معیار کی لکڑی، شیشہ اور ری سائیکل شدہ صنعتی مواد استعمال کرتے ہیں۔" : "Utilizing high-grade wood, glass, and recycled industrial materials for a sustainable and premium finish.",
                icon: CheckCircle2
              },
              {
                title: isUrdu ? "کم بجٹ میں بہترین کام" : "Cost-Effective Logic",
                desc: isUrdu ? "ہم پرانے مٹیریل کو کارآمد بنا کر آپ کا 50% تک خرچ بچاتے ہیں۔" : "Save up to 50% on renovation costs through smart material repurposing and direct factory sourcing.",
                icon: Zap
              },
              {
                title: isUrdu ? "وقت کی پابندی" : "Rapid Execution",
                desc: isUrdu ? "ہمارا تجربہ کار ٹیکنیکل اسٹاف ریکارڈ وقت میں کام مکمل کرنے کی صلاحیت رکھتا ہے۔" : "Our specialized teams deliver turn-key office and site transformations in record turnaround times.",
                icon: Zap
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all border-b-4 border-b-primary-blue">
                <item.icon className="w-10 h-10 text-primary-blue mb-6" />
                <h3 className={cn("text-xl font-black text-white mb-4", isUrdu && "urdu-text")}>{item.title}</h3>
                <p className={cn("text-gray-400 text-sm leading-relaxed", isUrdu && "urdu-text")}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* WHATSAPP CTA BOX */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-green-500/20 to-primary-blue/20 border border-green-500/30 rounded-[2.5rem] p-6 sm:p-10 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className={cn("text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase", isUrdu && "urdu-text")}>
                {isUrdu ? "مزید معلومات اور قیمتوں کے لیے ہم سے رابطہ کریں" : "Get Detailed Info & Instant Pricing"}
              </h2>
              <p className={cn("text-gray-300 text-lg mb-8 max-w-2xl", isUrdu && "urdu-text")}>
                {isUrdu 
                  ? "ہماری سروسز، اسٹاک کی تفصیلات اور موجودہ ریٹس جاننے کے لیے ابھی واٹس ایپ پر رابطہ کریں۔" 
                  : "Connect with our expert team on WhatsApp for project quotations, inventory lists, and real-time scrap rates."}
              </p>
              <a 
                href="https://wa.me/923152227331" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-500 text-white font-black py-5 px-10 rounded-2xl shadow-xl hover:shadow-green-500/20 transition-all text-xl"
              >
                <Zap className="w-6 h-6 fill-white" />
                {isUrdu ? "واٹس ایپ رابطہ: 03313141853" : "WhatsApp: +92 331 3141853"}
              </a>
              <p className="mt-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
                Direct Line: +92 331 3141853
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

