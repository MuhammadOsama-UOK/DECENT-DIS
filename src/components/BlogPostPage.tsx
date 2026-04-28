import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const BLOG_CONTENT: Record<string, any> = {
  '1': {
    category: 'Renovation',
    title: '10 Trends in Office Design for 2024',
    author: 'Decent Disposal Team',
    date: 'December 12, 2023',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200',
    content: `
      <h2>The Future of Workspace</h2>
      <p>As we navigate through 2024, the way we perceive and utilize office spaces continues to evolve dramatically. Modern businesses are realizing that a well-designed office is not just about aesthetics; it's a strategic asset that enhances productivity and well-being.</p>
      
      <h3>1. Flexible & Hybrid Layouts</h3>
      <p>The rigid cubicle layout is a thing of the past. Today's dynamic teams demand spaces that can quickly adapt to their changing needs. Movable partitions, modular furniture, and multipurpose zones are becoming standard features.</p>
      
      <h3>2. Biophilic Design Elements</h3>
      <p>Connecting with nature indoors has proven psychological benefits. Incorporating living walls, natural sunlight optimization, and indoor plants improves air quality and boosts employee morale.</p>
      
      <h3>3. Ergonomics First</h3>
      <p>Comfort translates directly to efficiency. Height-adjustable desks and ergonomically engineered seating are no longer optional perks but essential investments in your team's health.</p>
      
      <blockquote>
        "The best office designs of 2024 make employees feel as comfortable as they do at home, while providing the collaborative energy they can only find in the workplace."
      </blockquote>
      
      <p>If you're considering updating your workspace, our team at Decent Disposal offers end-to-end renovation services tailored to your budget and operational needs.</p>
    `
  },
  '2': {
    category: 'Scrap Buying',
    title: 'How to Price and Grade Scrap Metal',
    author: 'Decent Disposal Team',
    date: 'January 15, 2024',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200',
    content: `
      <h2>Understanding Market Value</h2>
      <p>Whether you're liquidating corporate assets or clearing an industrial site, knowing how scrap metal is priced and graded ensures you get the highest possible return on your waste.</p>
      
      <h3>Ferrous vs. Non-Ferrous Metals</h3>
      <p>The easiest way to categorize metals is using a magnet. Ferrous metals (iron, steel) stick to magnets and are generally lower in value but higher in volume. Non-ferrous metals (copper, aluminum, brass) do not stick to magnets and command significantly higher market prices.</p>
      
      <h3>Factors Affecting Price</h3>
      <ul>
        <li><strong>Current Market Rates:</strong> Commodity prices fluctuate daily based on global demand.</li>
        <li><strong>Purity:</strong> Clean metal without attachments (plastic, rubber, or other metals) is always worth more.</li>
        <li><strong>Quantity:</strong> Bulk sellers typically receive premium rates due to reduced processing overhead.</li>
      </ul>
      
      <p>At Decent Disposal, we pride ourselves on transparent weighing and instant cash settlements. We provide on-site evaluation for large-scale industrial and corporate liquidations across Karachi.</p>
    `
  },
  '3': {
    category: 'Renovation',
    title: 'Small Office Spaces: How to Maximize Efficiency',
    author: 'Decent Disposal Team',
    date: 'February 28, 2024',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1200',
    content: `
      <h2>Making Every Square Foot Count</h2>
      <p>Operating out of a small office doesn't mean compromising on professionalism or comfort. With smart design choices, even the most compact spaces can feel spacious and highly functional.</p>
      
      <h3>Smart Lighting Solutions</h3>
      <p>Natural light is your best friend in a small office. Avoid heavy drapes and opt for sheer blinds. If natural light is limited, use layered lighting—combining ambient overheads with focused task lighting—to create depth and reduce eye strain.</p>
      
      <h3>Vertical Storage</h3>
      <p>When floor space is premium, look up. Wall-mounted shelving and tall cabinets draw the eye upward and keep clutter off the desks. A tidy office instantly feels larger.</p>
      
      <h3>Color Psychology</h3>
      <p>Light colors reflect light, making walls recede and rooms feel larger. Consider a neutral palette of whites, light grays, or pale blues, using your brand colors sparingly as accents.</p>
      
      <p>Need help optimizing your small office layout? Decent Disposal provides budget-friendly renovation services that transform cramped quarters into efficient workspaces.</p>
    `
  },
  '4': {
    category: 'Sustainability',
    title: 'Electronics Donation and Recycling',
    author: 'Decent Disposal Team',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200',
    content: `
      <h2>The Critical Need for E-Waste Management</h2>
      <p>As technological advancement accelerates, businesses are replacing IT infrastructure at an unprecedented rate. Proper disposal of old computers, servers, and peripherals is no longer just an environmental ideal—it's a corporate responsibility.</p>
      
      <h3>The Environmental Impact</h3>
      <p>Electronic waste contains hazardous materials like lead, mercury, and cadmium. If improperly disposed of in landfills, these toxins can leach into soil and water supplies. Conversely, e-waste also contains valuable precious metals that can be reclaimed and reused.</p>
      
      <h3>Secure Data Destruction</h3>
      <p>Before recycling, ensuring data security is paramount. Professional liquidators don't just scrap the hardware; they guarantee the physical destruction of hard drives and storage media to prevent data breaches.</p>
      
      <h3>The Corporate Benefit</h3>
      <p>Beyond environmental stewardship, partnering with a certified scrap buyer allows companies to recover capital from obsolete assets while receiving official certificates of destruction for audit purposes.</p>
      
      <p>Decent Disposal specializes in IT infrastructure scrap. We provide secure, transparent, and profitable e-waste recycling solutions for businesses across Karachi.</p>
    `
  }
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
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
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 font-['Segoe_UI',_Tahoma,_Geneva,_Verdana,_sans-serif] text-[#333]">
      <div className="max-w-[800px] mx-auto px-6">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#0056b3] font-bold hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        
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
