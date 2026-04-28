import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

const TRUSTED_PARTNERS_CONTENT = {
  en: {
    title: "Our Trusted Partners & Corporate Network",
    description: "At Decent Disposal, we have built a legacy of trust with Pakistan's top-tier organizations, including the <strong>National Bank of Pakistan (NBP)</strong>, <strong>NADRA</strong>, <strong>State Bank of Pakistan (SBP)</strong>, <strong>Pakistan Stock Exchange (PSX)</strong>, <strong>K-Electric (KE)</strong>, <strong>Pakistan International Airlines (PIA)</strong>, and numerous multinational corporations. Our financial transparency is unmatched—we have processed high-value liquidation cheques of up to <strong>millions of Rupees (PKR 50M+)</strong> seamlessly, ensuring instant payments, verifiable corporate receipts, and absolute financial security. From projects worth <strong>PKR 50,000</strong> to massive liquidations exceeding <strong>PKR 10,000,000+</strong>, our track record of handling high-stake financial dealings makes us the most trusted partner for businesses nationwide."
  },
  ur: {
    title: "ہمارے قابل اعتماد شراکت دار اور کارپوریٹ نیٹ ورک",
    description: "ڈیسنٹ ڈسپوزل میں، ہم نے پاکستان کی اعلیٰ ترین تنظیموں کے ساتھ اعتماد کی ایک مضبوط میراث بنائی ہے، جن میں <strong>نیشنل بینک آف پاکستان (NBP)</strong>، <strong>نادرا (NADRA)</strong>، <strong>اسٹیٹ بینک آف پاکستان (SBP)</strong>، <strong>پاکستان اسٹاک ایکسچینج (PSX)</strong>، <strong>کے الیکٹرک (KE)</strong> اور <strong>پی آئی اے (PIA)</strong> شامل ہیں۔ ہماری مالی شفافیت بے مثال ہے—ہم نے بغیر کسی رکاوٹ کے <strong>کروڑوں روپے (PKR 50M+)</strong> تک کے ہائی ویلیو لیکویڈیشن چیکس پروسیس کیے ہیں۔ <strong>PKR 50,000</strong> کے چھوٹے منصوبوں سے لے کر <strong>PKR 10,000,000+</strong> (ایک کروڑ سے زائد) تک کے بڑے کارپوریٹ معاہدوں میں، ہم نے فوری ادائیگیوں اور مکمل مالیاتی تحفظ کو یقینی بنایا ہے۔"
  }
};

const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80'
];

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 overflow-hidden selection:bg-primary-blue selection:text-white">
      <div className="portfolio-main-container max-w-7xl mx-auto">
        {/* TRUSTED PARTNERS SEO SECTION */}
        <div className="section-heading">
          <h2 className={cn(isUrdu && "urdu-text", "mb-6")}>
            {isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.title : TRUSTED_PARTNERS_CONTENT.en.title}
          </h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 md:px-0 text-center mb-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <p 
              className={cn("text-gray-600 leading-relaxed md:text-lg", isUrdu && "urdu-text")}
              dangerouslySetInnerHTML={{ __html: isUrdu ? TRUSTED_PARTNERS_CONTENT.ur.description : TRUSTED_PARTNERS_CONTENT.en.description }}
            />
            
            <div className="mt-10 mb-8 border-y border-gray-200 py-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default">
               <span className="text-xl sm:text-2xl font-black italic text-gray-800">NADRA</span>
               <span className="text-xl sm:text-2xl font-black text-gray-800">NBP</span>
               <span className="text-xl sm:text-2xl font-black italic text-gray-800">PSX</span>
               <span className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tighter">K-Electric</span>
               <span className="text-xl sm:text-2xl font-black italic text-gray-800">SBP</span>
               <span className="text-xl sm:text-2xl font-black text-gray-800">PIA</span>
               <span className="text-xl sm:text-2xl font-black italic text-gray-800">Meezan</span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-semibold text-gray-700">Verified Transactions</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-semibold text-gray-700">Corporate Liquidations</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-semibold text-gray-700">Trusted Partnerships</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. RENOVATION GALLERY SECTION */}
        <div className="section-heading">
          <h2 className={cn(isUrdu && "urdu-text")}>
            {isUrdu ? "رینوویشن اور سائٹ ایگزیکیوشن" : "Renovation & Site Execution"}
          </h2>
        </div>
        <div className="reno-grid-system px-4 md:px-0">
          {RENOVATION_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="reno-card"
            >
              <img src={img} alt={`Work ${i+1}`} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-main-container {
            padding: 40px 10px;
            background-color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
        }

        .section-heading {
            text-align: center;
            margin: 40px 0 30px;
        }

        .section-heading h2 {
            font-size: 28px;
            color: #1a2e44;
            text-transform: uppercase;
            display: inline-block;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            font-weight: 800;
        }

        .logo-grid-system {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 20px;
            align-items: center;
            margin-bottom: 60px;
        }

        .logo-box {
            text-align: center;
            padding: 10px;
        }

        .logo-box img {
            max-width: 100%;
            height: 60px;
            object-fit: contain;
            filter: grayscale(100%);
            opacity: 0.6;
            transition: 0.3s ease-in-out;
        }

        .logo-box:hover img {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.1);
        }

        .reno-grid-system {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 15px;
        }

        .reno-card {
            height: 250px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #eee;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .reno-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.5s;
            display: block;
        }

        .reno-card:hover img {
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .logo-grid-system { grid-template-columns: repeat(3, 1fr); }
            .section-heading h2 { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}

