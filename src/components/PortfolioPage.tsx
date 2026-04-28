import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Maine reliable URLs use kiye hain jo block nahi hotay
const PARTNERS = [
  { name: "NADRA", logo: "https://www.nadra.gov.pk/wp-content/uploads/2023/04/Nadra-Logo.png" },
  { name: "NBP", logo: "https://www.nbp.com.pk/NBP-Images/NBPLogo.png" },
  { name: "PIA", logo: "https://www.piac.com.pk/assets/images/logo.png" },
  { name: "SBP", logo: "https://www.sbp.org.pk/images/sbp-logo.png" },
  { name: "K-Electric", logo: "https://www.ke.com.pk/assets/img/logo.png" },
  { name: "PSX", logo: "https://www.psx.com.pk/psx/themes/default/assets/images/logo.png" },
  { name: "Meezan", logo: "https://www.meezanbank.com/wp-content/themes/mbl/images/logo.png" }
];

const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35682f94a1d8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop'
];

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="bg-white min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADING */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "inline-block border-b-4 border-blue-600 pb-3 text-2xl md:text-4xl font-extrabold text-slate-800",
            isUrdu && "font-serif"
          )}>
            {isUrdu ? "ہمارے قابل اعتماد شراکت دار" : "Our Trusted Partners"}
          </h2>
        </div>

        {/* LOGO GRID */}
        <div className="max-w-6xl mx-auto mb-20 bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-inner">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {PARTNERS.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="h-12 w-auto object-contain transition-transform hover:scale-110"
                  onError={(e) => { e.target.style.display = 'none'; }} // Agar logo load na ho toh hide ho jaye
                />
                <span className="text-[10px] font-bold text-slate-500 mt-2 uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">
            {isUrdu ? "سائٹ ایگزیکیوشن" : "Site Execution Gallery"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RENOVATION_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="h-72 rounded-2xl overflow-hidden shadow-xl bg-gray-200"
            >
              <img 
                src={img} 
                alt="Work Execution" 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
