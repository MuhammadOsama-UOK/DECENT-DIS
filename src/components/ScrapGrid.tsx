import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Fan, 
  Armchair, 
  Microchip, 
  Hammer, 
  Zap, 
  Settings2 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SCRAP_ITEMS = [
  {
    id: 'ac',
    title: 'AC & Chillers',
    titleUr: 'اے سی اور Chillers',
    desc: 'Split AC, AHU systems, copper piping.',
    icon: <Fan className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?auto=format&fit=crop&q=80'
  },
  {
    id: 'furniture',
    title: 'Office Furniture',
    titleUr: 'دفتری فرنیچر',
    desc: 'Chairs, tables, workstations.',
    icon: <Armchair className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80'
  },
  {
    id: 'e-waste',
    title: 'E-Waste',
    titleUr: 'ای ویسٹ',
    desc: 'Computers, UPS, batteries.',
    icon: <Microchip className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80'
  },
  {
    id: 'metal',
    title: 'Metal Scrap',
    titleUr: 'دھات کا کچرا',
    desc: 'Iron, aluminium, steel.',
    icon: <Hammer className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?auto=format&fit=crop&q=80'
  },
  {
    id: 'elec',
    title: 'Electrical',
    titleUr: 'الیکٹریکل',
    desc: 'Copper wiring, cables.',
    icon: <Zap className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1584774354932-62ceb99e6053?auto=format&fit=crop&q=80'
  },
  {
    id: 'machinery',
    title: 'Machinery',
    titleUr: 'مشینری',
    desc: 'Generators, motors, pumps.',
    icon: <Settings2 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80'
  }
];

export default function ScrapGrid() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <section className="bg-white py-24 px-6 font-poppins overflow-hidden" id="scrap-grid">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-16 space-y-4">
          <h2 className={cn("text-[clamp(28px,5vw,38px)] text-[#2d3436] font-black uppercase tracking-tight font-ooutfit", isUrdu && "urdu-text leading-tight")}>
            {isUrdu ? "سکریپ" : "Scrap"} <span className="text-[#00b894]">{isUrdu ? "خریداری" : "Buying"}</span>
          </h2>
          <div className="w-[60px] h-[4px] bg-[#00b894] mx-auto" />
          <p className={cn("text-gray-500 max-w-2xl mx-auto", isUrdu && "urdu-text")}>
            {isUrdu ? "ہم پاکستان میں بہترین نرخوں پر ہر قسم کے دفتری اور صنعتی سکریپ خریدتے ہیں۔" : "We buy all kinds of office and industrial scrap at the best rates in Pakistan."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCRAP_ITEMS.map((item, index) => (
            <Link to="/quote" key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[320px] rounded-[15px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.05)] bg-[#dfe6e9]"
              >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 z-10" />
              
              <div className={cn(
                "absolute bottom-0 left-0 w-full p-8 text-white z-20",
                isUrdu && "text-right"
              )}>
                <div className="w-12 h-12 bg-[#00b894] rounded-[8px] flex items-center justify-center mb-4 transition-all group-hover:bg-white group-hover:text-[#00b894]">
                   {item.icon}
                </div>
                <h3 className={cn("text-2xl font-black mb-1", isUrdu && "urdu-text")}>
                  {isUrdu ? item.titleUr : item.title}
                </h3>
                <p className={cn("text-sm opacity-90", isUrdu && "urdu-text")}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
