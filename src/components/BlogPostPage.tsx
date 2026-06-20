import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';
import { BLOG_CONTENT } from '../data/blogs';
import SEO from './SEO';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const post = id ? BLOG_CONTENT[id] : null;

  if (!post) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-[#333]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0056b3] mb-4">Article Not Found</h1>
          <p className="text-[#666] mb-8">The content you are looking for does not exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0056b3] text-white rounded-lg font-bold hover:bg-[#004494] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] text-[#333] relative">
      <SEO 
        title={`${post.title} | Decent Disposal`}
        description={post.excerpt}
        url={`https://decentdisposal.pk/blog/${id}`}
        image={post.image}
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

      <div className="max-w-[800px] mx-auto px-6">
        
        <span className="text-sm font-bold uppercase text-[#28a745] tracking-wider mb-4 block">
          {post.category}
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold text-[#222] leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-[#666] text-sm mb-10 border-b border-[#ddd] pb-6">
          <span className="font-bold text-[#333]">{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-12"
        />
        
        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#0056b3] prose-headings:font-bold prose-headings:mb-6 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[#444] prose-a:text-[#0056b3] prose-li:text-[#444] prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#28a745] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#555]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
      </div>
    </div>
  );
}
