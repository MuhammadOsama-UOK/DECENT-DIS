import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Smartphone, Truck, Scale, Banknote, PackageOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const STEPS = [
  {
    id: 1,
    title: 'Order Book Karein',
    titleUr: 'آرڈر بک کریں',
    desc: 'Apna address aur time schedule karein. Humari team aap se rabta karegi.',
    descUr: 'اپنا ایڈریس اور ٹائم شیڈول کریں۔ ہماری ٹیم آپ سے رابطہ کرے گی۔',
    icon: <Smartphone className="w-8 h-8" />
  },
  {
    id: 2,
    title: 'Doorstep Pickup',
    titleUr: 'ڈور اسٹیپ پک اپ',
    desc: 'Humari team aapki location par aayegi. Aapko kahin jane ki zaroorat nahi.',
    descUr: 'ہماری ٹیم آپ کی لوکیشن پر آئے گی۔ آپ کو کہیں جانے کی ضرورت نہیں۔',
    icon: <Truck className="w-8 h-8" />
  },
  {
    id: 3,
    title: 'Digital Weight',
    titleUr: 'ڈیجیٹل وزن',
    desc: 'Hum **Advanced Digital Scales** ka istemal karte hain taake aapko mile 100% sahi wazan.',
    descUr: 'ہم ایڈوانسڈ ڈیجیٹل اسکیلز کا استعمال کرتے ہیں تاکہ آپ کو ملے 100٪ صحیح وزن۔',
    icon: <Scale className="w-8 h-8" />,
    tech: 'Tech Feature: Calibrated digital sensors for zero error.'
  },
  {
    id: 4,
    title: 'Instant Payment',
    titleUr: 'فوری ادائیگی',
    desc: 'Wazan ke baad foran digital receipt aur aapki raqam aapko de di jayegi.',
    descUr: 'وزن کے بعد فوراً ڈیجیٹل رسید اور آپ کی رقم آپ کو دے دی جائے گی۔',
    icon: <Banknote className="w-8 h-8" />
  }
];

export default function ProcessSection() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 font-poppins relative">
      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Link to="/process" className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 w-full h-full block">
                <div className="absolute -top-4 w-10 h-10 bg-primary-green rounded-full text-white font-bold flex items-center justify-center shadow-lg">
                  {step.id}
                </div>
                
                <div className="text-primary-green mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className={cn("text-xl font-bold text-gray-900 mb-4", isUrdu && "urdu-text")}>
                  {isUrdu ? step.titleUr : step.title}
                </h3>
                
                <p className={cn("text-gray-500 text-sm leading-relaxed mb-6", isUrdu && "urdu-text")}>
                  {isUrdu ? step.descUr : step.desc}
                </p>

                {step.tech && (
                  <div className="mt-auto p-4 bg-primary-green/5 border-l-4 border-primary-green rounded-r-lg text-[10px] md:text-xs text-gray-600 font-medium italic text-left">
                    {step.tech}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
