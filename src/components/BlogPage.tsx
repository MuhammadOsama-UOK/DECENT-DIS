import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import SEO from './SEO';

const CATEGORIES = ['All', 'Renovation', 'Scrap Buying', 'Sustainability', 'Renovation & Scrap'];

export default function BlogPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isUrdu = i18n.language === 'ur';
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] text-[#333] relative">
      <SEO 
        title="Blog & Articles | Decent Disposal"
        description="Read the latest articles about office renovation trends, scrap market prices, and sustainability practices in Pakistan."
        url="https://decentdisposal.pk/blog"
      />
      <motion.button 

        whileHover={{ scale: 1.1, x: isUrdu ? 4 : -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
        className={cn(
          "fixed top-24 z-50 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-800 border border-gray-150 transition-all shadow-md backdrop-blur-md flex items-center justify-center",
          isUrdu ? "right-4 md:right-8" : "left-4 md:left-8"
        )}
      >
        <ArrowLeft className={cn("w-5 h-5", isUrdu && "rotate-180")} />
      </motion.button>
      
      {/* Header Section */}
      <header className="bg-white py-16 px-6 text-center border-b-[2px] border-[#eee] mb-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-[#0056b3]"
          >
            Resources & Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#666]"
          >
            Expert advice on Office Renovation and Smart Scrap Management
          </motion.p>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* Filter Tags */}
        <div className="text-center mb-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(category => (
            <span 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full cursor-pointer text-sm transition-all duration-300 shadow-sm border",
                activeCategory === category 
                  ? "bg-[#0056b3] text-white border-[#0056b3]" 
                  : "bg-white text-[#666] border-[#ddd] hover:border-[#0056b3] hover:text-[#0056b3]"
              )}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-300"
            >
              <img src={post.image} alt={post.title} className="w-full h-[250px] object-cover bg-[#eee]" />
              <div className="p-8 flex flex-col justify-between h-[calc(100%-250px)]">
                <div>
                  <span className="text-xs font-bold uppercase text-[#28a745] mb-3 block">
                    {post.category}
                  </span>
                  <Link to={`/blog/${post.id}`} className="text-2xl font-bold text-[#222] hover:text-[#0056b3] transition-colors mb-4 block leading-tight">
                    {post.title}
                  </Link>
                  <p className="text-[#666] text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0056b3] hover:bg-[#004494] text-white text-sm font-bold rounded-lg transition-colors w-fit">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer SEO Section */}
      <section className="bg-white py-16 px-6 mt-24 text-center border-t border-[#eee]">
        <div className="max-w-[800px] mx-auto">
          <h3 className="text-2xl font-bold text-[#0056b3] mb-4">Reliable Office Solutions</h3>
          <p className="text-[#666] leading-relaxed">
            We are experts in turning old workspaces into modern masterpieces and providing hassle-free scrap buying services. Whether you are looking to renovate or sell industrial waste, we are your trusted partner.
          </p>
        </div>
      </section>

    </div>
  );
}
