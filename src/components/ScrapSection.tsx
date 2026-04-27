import React from 'react';
import { motion } from 'motion/react';
import { Fan, Armchair, Cpu, Wrench, Zap, Settings } from 'lucide-react';

const SCRAP_ITEMS = [
  {
    title: 'AC & Chillers',
    description: 'Split AC, AHU systems, copper piping.',
    icon: <Fan className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?w=500&auto=format&fit=crop&q=60',
  },
  {
    title: 'Office Furniture',
    description: 'Chairs, tables, workstations.',
    icon: <Armchair className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=75&w=600',
  },
  {
    title: 'E-Waste',
    description: 'Computers, UPS, batteries.',
    icon: <Cpu className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=75&w=600',
  },
  {
    title: 'Metal Scrap',
    description: 'Iron, aluminium, steel.',
    icon: <Wrench className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?auto=format&fit=crop&q=75&w=600',
  },
  {
    title: 'Electrical',
    description: 'Copper wiring, cables.',
    icon: <Zap className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1584774354932-62ceb99e6053?w=500&auto=format&fit=crop&q=60',
  },
  {
    title: 'Machinery',
    description: 'Generators, motors, pumps.',
    icon: <Settings className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=75&w=600',
  },
];

export default function ScrapSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            Scrap <span className="text-emerald-500">Buying</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We buy all kinds of office and industrial scrap at the best rates in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCRAP_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-white group-hover:text-emerald-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
