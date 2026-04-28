import { motion } from 'framer-motion'; // Check if using framer-motion or motion/react
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

const TRUSTED_PARTNERS_CONTENT = {
  en: {
    title: "Our Trusted Partners & Corporate Network",
    description: "At Decent Disposal, we have built a legacy of trust with Pakistan's top-tier organizations, including the <strong>National Bank of Pakistan (NBP)</strong>, <strong>NADRA</strong>, <strong>State Bank of Pakistan (SBP)</strong>, <strong>Pakistan Stock Exchange (PSX)</strong>, <strong>K-Electric (KE)</strong>, <strong>Pakistan International Airlines (PIA)</strong>, and numerous multinational corporations. Our financial transparency is unmatched—we have processed high-value liquidation cheques of up to <strong>millions of Rupees (PKR 50M+)</strong> seamlessly, ensuring instant payments, verifiable corporate receipts, and absolute financial security."
  },
  ur: {
    title: "ہمارے قابل اعتماد شراکت دار اور کارپوریٹ نیٹ ورک",
    description: "ڈیسنٹ ڈسپوزل میں، ہم نے پاکستان کی اعلیٰ ترین تنظیموں کے ساتھ اعتماد کی ایک مضبوط میراث بنائی ہے، جن میں <strong>نیشنل بینک آف پاکستان (NBP)</strong>، <strong>نادرا (NADRA)</strong>، <strong>اسٹیٹ بینک آف پاکستان (SBP)</strong>، <strong>پاکستان اسٹاک ایکسچینج (PSX)</strong>، <strong>کے الیکٹرک (KE)</strong> اور <strong>پی آئی اے (PIA)</strong> شامل ہیں۔ ہماری مالی شفافیت بے مثال ہے—ہم نے کروڑوں روپے تک کے ہائی ویلیو لیکویڈیشن چیکس پروسیس کیے ہیں۔"
  }
};

// Optimized Unsplash URLs with &w=600&q=60 for faster loading
const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=60'
];

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    // Reduced pt-32 to pt-12 to remove top gap
    <div className="bg-white min-h-screen pt-12 pb-20 overflow-hidden selection:bg-primary-blue selection:text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 1. TRUSTED PARTNERS SECTION */}
        <div className="text-center mb-10">
          <h2 className={cn(
            "inline-block border-bottom-custom pb-2 text-2xl md:text-3xl font-extrabold text-[#1a2e44] uppercase tracking-wide",
            isUrdu && "urdu-text"
          )}>
            {isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.title : TRUSTED_PARTNERS_CONTENT.en.title}
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }} // Faster animation
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
            <p 
              className={cn("text-gray-600 leading-relaxed text-base md:text-lg", isUrdu && "urdu-text text-right")}
              dangerouslySetInnerHTML={{ __html: isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.description : TRUSTED_PARTNERS_CONTENT.en.description }}
            />
            
            {/* Partners Logos/Text */}
            <div className="mt-8 mb-6 border-y border-gray-200 py-6 flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
               {["NADRA", "NBP", "PSX", "K-Electric", "SBP", "PIA", "Meezan"].map((partner) => (
                 <span key={partner} className="text-lg md:text-xl font-black text-gray-800 italic hover:text-blue-600 transition-colors cursor-default">
                   {partner}
                 </span>
               ))}
            </div>

            {/* Badges */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {["Verified Transactions", "Corporate Liquidations", "Trusted Partnerships"].map((label, index) => (
                <div key={label} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                  <div className={cn("w-2 h-2 rounded-full", index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-yellow-500")}></div>
                  <span className="text-xs font-bold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2. RENOVATION GALLERY SECTION */}
        <div className="text-center mb-8">
          <h2 className={cn(
            "inline-block border-bottom-custom pb-2 text-2xl md:text-3xl font-extrabold text-[#1a2e44] uppercase tracking-wide",
            isUrdu && "urdu-text"
          )}>
            {isUrdu ? "رینوویشن اور سائٹ ایگزیکیوشن" : "Renovation & Site Execution"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          {RENOVATION_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative h-64 rounded-xl overflow-hidden shadow-md group"
            >
              <img 
                src={img} 
                alt={`Work ${i+1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy" // Critical for performance
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .urdu-text {
            font-family: 'Noto Nastaliq Urdu', serif;
            line-height: 1.8;
            direction: rtl;
        }
        .border-bottom-custom {
            border-bottom: 4px solid #007bff;
        }
      `}</style>
    </div>
  );
}
