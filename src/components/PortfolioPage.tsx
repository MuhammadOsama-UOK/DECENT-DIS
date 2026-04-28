import { motion } from 'framer-motion'; // Agar error aaye toh is line ko 'motion/react' kar dein
import { useTranslation } from 'react-i18next';

// Agar 'cn' utility error de rahi ho toh niche wala function use karein
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PARTNERS = [
  { name: "NADRA", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/NADRA_logo.svg/1200px-NADRA_logo.svg.png" },
  { name: "NBP", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/National_Bank_of_Pakistan_logo.svg/1200px-National_Bank_of_Pakistan_logo.svg.png" },
  { name: "PSX", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Pakistan_Stock_Exchange_logo.svg/1200px-Pakistan_Stock_Exchange_logo.svg.png" },
  { name: "K-Electric", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/K-Electric_Logo.svg/1200px-K-Electric_Logo.svg.png" },
  { name: "SBP", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/State_Bank_of_Pakistan_Logo.svg/1200px-State_Bank_of_Pakistan_Logo.svg.png" },
  { name: "PIA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pakistan_International_Airlines_Logo.svg/1280px-Pakistan_International_Airlines_Logo.svg.png" },
  { name: "Meezan Bank", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Meezan_Bank_Logo.svg/1200px-Meezan_Bank_Logo.svg.png" }
];

const TRUSTED_PARTNERS_CONTENT = {
  en: {
    title: "Our Trusted Partners & Corporate Network",
    description: "At Decent Disposal, we have built a legacy of trust with Pakistan's top-tier organizations. Our financial transparency is unmatched—we have processed high-value liquidation cheques of up to <strong>millions of Rupees (PKR 50M+)</strong> seamlessly."
  },
  ur: {
    title: "ہمارے قابل اعتماد شراکت دار اور کارپوریٹ نیٹ ورک",
    description: "ڈیسنٹ ڈسپوزل میں، ہم نے پاکستان کی اعلیٰ ترین تنظیموں کے ساتھ اعتماد کی ایک مضبوط میراث بنائی ہے۔ ہم نے کروڑوں روپے (PKR 50M+) تک کے ہائی ویلیو لیکویڈیشن چیکس کامیابی سے پروسیس کیے ہیں۔"
  }
};

const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=60'
];

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="bg-white min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className={cn(
            "inline-block border-b-4 border-blue-600 pb-2 text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-wide",
            isUrdu && "font-['Noto_Nastaliq_Urdu'] leading-[2] text-right"
          )}>
            {isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.title : TRUSTED_PARTNERS_CONTENT.en.title}
          </h2>
        </div>

        {/* CONTENT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm text-center">
            <p 
              className={cn(
                "text-slate-600 leading-relaxed text-base md:text-lg mb-10",
                isUrdu && "font-['Noto_Nastaliq_Urdu'] leading-[2.2] text-right"
              )}
              dangerouslySetInnerHTML={{ __html: isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.description : TRUSTED_PARTNERS_CONTENT.en.description }}
            />
            
            {/* LOGO GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-center opacity-80">
              {PARTNERS.map((item) => (
                <div key={item.name} className="flex flex-col items-center group">
                  <img 
                    src={item.logo} 
                    alt={item.name}
                    className="h-10 md:h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                  />
                  <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* GALLERY SECTION */}
        <div className="text-center mb-8">
          <h2 className={cn("text-2xl font-bold text-slate-800", isUrdu && "font-['Noto_Nastaliq_Urdu']")}>
            {isUrdu ? "سائٹ ایگزیکیوشن گیلری" : "Site Execution Gallery"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RENOVATION_IMAGES.map((img, i) => (
            <div key={i} className="h-64 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={img} 
                alt="Work" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
