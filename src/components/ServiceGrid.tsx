import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Paintbrush,
  Grid,
  Lightbulb,
  Armchair,
  Layout,
  Truck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

import regeneratedImg from '../assets/images/regenerated_image_1778789751238.png';

const SERVICES = [
  {
    id: 'glass',
    title: 'Glass Work',
    titleUr: 'گلاس ورک',
    desc: 'Smart Partitions, Glass Cabins & Toughened Glass Solutions.',
    descUr: 'سمارٹ پارٹیشنز، شیشے کے کیبنز اور ٹفنڈ گلاس سلوشنز۔',
    descRoman: 'Ghar ya office me khubsurat glass partition aur cabins lagwayen taake space modern aur shaandar lage.',
    icon: <Layout className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ceiling',
    title: 'Designer Ceilings',
    titleUr: 'سیلنگ ڈیزائن',
    desc: 'Designer Gypsum ceilings, POP works & Grid Ceilings.',
    descUr: 'ڈیزائنر جپسم سیلنگ، پی او پی ورکس اور گرڈ سیلنگز۔',
    descRoman: 'Apne office ya ghar me fancy Gypsum ceilings banwayen jo mazboot aur behad khubsurat hon.',
    icon: <Grid className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1660492039236-4e660d5a1a14?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'paint',
    title: 'Premium Paint',
    titleUr: 'پریمیم پینٹ',
    desc: 'Luxury textures, Royal shine & Corporate finish paints.',
    descUr: 'لگژری ٹیکسٹچرز، رائل شائن اور کارپوریٹ فنش پینٹس۔',
    descRoman: 'Luxury paint, premium textures aur royal shiny paint jo wall ko naya chamakdar look dein.',
    icon: <Paintbrush className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'flooring',
    title: 'Flooring',
    titleUr: 'فلورنگ',
    desc: 'Vinyl flooring, Italian Marble & High-end Tile works.',
    descUr: 'وائلڈ فلورنگ، اطالوی سنگ مرمر اور اعلیٰ معیار کا ٹائل ورک۔',
    descRoman: 'Stylish aur lambay chalnay wale Vinyl floors, Italian Marble aur customized tiles lagwayen.',
    icon: <Layers className="w-8 h-8" />,
    image: regeneratedImg
  },
  {
    id: 'electric',
    title: 'Electric Work',
    titleUr: 'الیکٹریکل ورک',
    desc: 'Smart Lighting, Concealed Wiring & Server setup.',
    descUr: 'سمارٹ لائٹنگ، پوشیدہ وائرنگ اور سرور سیٹ اپ۔',
    descRoman: 'Safety k sath androni wiring, smart lightning setup aur heavy database server configuration karwayen.',
    icon: <Lightbulb className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wood',
    title: 'Wood Work',
    titleUr: 'وڈ ورک',
    desc: 'Custom Designer Tables, Cabinets & Modular Furniture.',
    descUr: 'کسٹم ڈیزائنر میزیں، الماری اور ماڈیولر فرنیچر۔',
    descRoman: 'High-quality designer tables, wooden wardrobes aur customize office cabinets jo saalo saal chalain.',
    icon: <Armchair className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'shifting',
    title: 'Professional Lifting & Shifting',
    titleUr: 'پیشہ ورانہ لِفٹنگ اور شفٹنگ',
    desc: 'Expert services for office relocation, heavy machine moving, and secure goods transportation. Click to learn more.',
    descUr: 'آفس رینوویشن، بھاری مشینری کی منتقلی اور سامان کی محفوظ نقل و حمل کے لیے ماہرانہ خدمات۔ تفصیلات کے لیے کلک کریں۔',
    descRoman: 'Office relocation, factory shifting ya bhaari saaman uthana aur usko mehfooz tareeqay se nayi jagah shift karna.',
    icon: <Truck className="w-8 h-8" />,
    image: '/images/lifting_shifting_service_1781519192459.jpg'
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
            {isUrdu ? "جدید اور آرام دہ کاروباری ماحول کے لیے پریمیم ڈیزائن اور رینوویشن کے حل۔" : "Premium renovation solutions for a modern and productive workspace."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Link to={`/service/${service.id}`} key={service.id} className={cn(service.id === 'shifting' ? "md:col-span-2 lg:col-span-3" : "")}>
              <article
                className={cn("group relative h-[300px] md:h-[350px] rounded-[15px] overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover:border-[#64ffda] hover:shadow-[0_10px_30px_rgba(100,255,218,0.1)]", service.id === 'shifting' ? "w-full" : "")}
              >
              <img 
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform transform-gpu duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b14]/50 to-[#070b14]/90 z-10" />

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
                <p className={cn("text-[0.85rem] text-[#ccd6f6] opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300", isUrdu && "urdu-text")}>
                  {isUrdu ? service.descUr : service.desc}
                </p>
                {!isUrdu && service.descRoman && (
                  <p className="text-[0.78rem] text-[#64ffda] font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-3 group-hover:translate-y-0 transition-all duration-300 mt-1 italic">
                    {service.descRoman}
                  </p>
                )}
                <div className={cn(
                  "mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#64ffda]/10 text-[#64ffda] text-xs font-bold uppercase tracking-[0.1em] border border-[#64ffda]/25 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0",
                  isUrdu && "flex-row-reverse urdu-text font-medium text-xs leading-none"
                )}>
                  <span>{isUrdu ? "تفصیلات دیکھیں" : "View Details"}</span>
                  <span className={cn("inline-block transform transition-transform group-hover:translate-x-1.5 duration-300", isUrdu && "rotate-180 group-hover:-translate-x-1.5")}>➔</span>
                </div>
              </div>
            </article>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
