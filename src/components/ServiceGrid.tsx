import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Paintbrush,
  Grid,
  Lightbulb,
  Armchair,
  Layout
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SERVICES = [
  {
    id: 'glass',
    title: 'Glass Work',
    titleUr: 'گلاس ورک',
    desc: 'Smart Partitions, Glass Cabins & Toughened Glass Solutions.',
    icon: <Layout className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 'ceiling',
    title: 'False Ceiling',
    titleUr: 'فالس سیلنگ',
    desc: 'Designer Gypsum ceilings, POP works & Grid Ceilings.',
    icon: <Grid className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 'paint',
    title: 'Premium Paint',
    titleUr: 'پریمیم پینٹ',
    desc: 'Luxury textures, Royal shine & Corporate finish paints.',
    icon: <Paintbrush className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 'flooring',
    title: 'Flooring',
    titleUr: 'فلورنگ',
    desc: 'Vinyl flooring, Italian Marble & High-end Tile works.',
    icon: <Layers className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=70'
  },
  {
    id: 'electric',
    title: 'Electric Work',
    titleUr: 'الیکٹریکل ورک',
    desc: 'Smart Lighting, Concealed Wiring & Server setup.',
    icon: <Lightbulb className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=60'
  },
  {
    id: 'wood',
    title: 'Wood Work',
    titleUr: 'وڈ ورک',
    desc: 'Custom Designer Tables, Cabinets & Modular Furniture.',
    icon: <Armchair className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=60'
  }
];

export default function ServiceGrid() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <section id="services" className="bg-[#070b14] py-24 px-4 font-poppins text-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center max-w-[700px] mx-auto mb-16 space-y-4">
          <h2 className={cn("text-[clamp(1.8rem,8vw,3rem)] font-black uppercase tracking-[2px] font-montserrat", isUrdu && "urdu-text leading-tight")}>
            Interior <span className="text-[#64ffda]">Services</span>
          </h2>
          <p className={cn("text-[#a0aec0] text-[clamp(0.9rem,4vw,1.1rem)]", isUrdu && "urdu-text")}>
            {isUrdu ? "جدید اور پیداواری کام کی جگہ کے لیے پریمیم رینوویشن حل۔" : "Premium renovation solutions for a modern and productive workspace."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Link to="/portfolio" key={service.id}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[350px] rounded-[15px] overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover:border-[#64ffda] hover:shadow-[0_10px_30px_rgba(100,255,218,0.1)]"
              >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-bottom from-transparent via-[#070b14]/40 to-[#070b14]/90 z-10" />

              <div className={cn(
                "absolute inset-0 p-8 flex flex-col justify-end z-20",
                isUrdu && "text-right items-end"
              )}>
                <div className="text-[#64ffda] mb-4">
                  {service.icon}
                </div>
                <h3 className={cn("text-2xl font-black mb-2 font-montserrat", isUrdu && "urdu-text")}>
                  {isUrdu ? service.titleUr : service.title}
                </h3>
                <p className={cn("text-[0.85rem] text-[#ccd6f6] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300", isUrdu && "urdu-text")}>
                  {service.desc}
                </p>
              </div>
            </motion.article>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
