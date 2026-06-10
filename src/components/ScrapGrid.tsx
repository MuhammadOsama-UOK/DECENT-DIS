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
    image: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'furniture',
    title: 'Office Furniture',
    titleUr: 'دفتری فرنیچر',
    desc: 'Chairs, tables, workstations.',
    icon: <Armchair className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'e-waste',
    title: 'E-Waste',
    titleUr: 'ای ویسٹ',
    desc: 'Computers, UPS, batteries.',
    icon: <Microchip className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'metal',
    title: 'Metal Scrap',
    titleUr: 'دھات کا کچرا',
    desc: 'Iron, aluminium, steel.',
    icon: <Hammer className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'elec',
    title: 'Electrical',
    titleUr: 'الیکٹریکل',
    desc: 'Copper wiring, cables.',
    icon: <Zap className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1584774354932-62ceb99e6053?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'machinery',
    title: 'Machinery',
    titleUr: 'مشینری',
    desc: 'Generators, motors, pumps.',
    icon: <Settings2 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=600&q=80'
  }
];

export default function ScrapGrid() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <section className="bg-[#050505] py-24 px-6 font-poppins overflow-hidden" id="scrap-grid">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-16 space-y-4">
          <h2 className={cn("text-[clamp(28px,5vw,38px)] text-white font-black uppercase tracking-tight", isUrdu && "urdu-text leading-tight")}>
            {isUrdu ? "سکریپ" : "Scrap"} <span className="text-[#00b894]">{isUrdu ? "خریداری" : "Buying"}</span>
          </h2>
          <div className="w-[60px] h-[4px] bg-[#00b894] mx-auto" />
          <p className={cn("text-gray-500 max-w-2xl mx-auto", isUrdu && "urdu-text")}>
            {isUrdu ? "ہم پاکستان میں بہترین نرخوں پر ہر قسم کے دفتری اور صنعتی سکریپ خریدتے ہیں۔" : "We buy all kinds of office and industrial scrap at the best rates in Pakistan."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCRAP_ITEMS.map((item, index) => (
            <Link to={`/service/${item.id}`} key={item.id}>
              <article
                className="group relative h-[300px] md:h-[350px] rounded-[15px] overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover:border-[#00b894] hover:shadow-[0_10px_30px_rgba(0,184,148,0.1)]"
              >
              <img 
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform transform-gpu duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050b14]/50 to-[#050b14]/90 z-10" />
              
              <div className={cn(
                "absolute inset-0 p-8 flex flex-col justify-end z-20 text-white",
                isUrdu && "text-right items-end"
              )}>
                <div className="text-[#00b894] mb-4">
                   {item.icon}
                </div>
                <h3 className={cn("text-2xl font-black mb-2 font-montserrat", isUrdu && "urdu-text")}>
                  {isUrdu ? item.titleUr : item.title}
                </h3>
                <p className={cn("text-[0.85rem] text-[#ccd6f6] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300", isUrdu && "urdu-text")}>
                  {item.desc}
                </p>
              </div>
            </article>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
