import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ArrowRight, ExternalLink, Bot } from 'lucide-react';
import { SERVICES } from './ServiceGrid';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const FAQS = [
  {
    q: "What kind of scrap does Decent Disposal buy?",
    a: "We purchase all types of industrial scrap, including copper, iron, aluminum, heavy machinery, IT equipment, and corporate office furniture."
  },
  {
    q: "Do you provide services across all of Karachi?",
    a: "Yes, we cover all major industrial and commercial hubs in Karachi, including SITE, Landhi, Korangi, and Port Qasim, with immediate site visits."
  },
  {
    q: "What are your rates for office renovation?",
    a: "Our renovation rates are project-specific. However, we specialize in high-quality, low-budget execution by smartly repurposing materials, saving you up to 50% compared to new builds."
  },
  {
    q: "What is your payment process?",
    a: "We ensure transparent, on-the-spot payments for all scrap materials before lifting. For renovation projects, we have structured milestone-based payments and give quotes."
  }
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      const searchTerm = q.toLowerCase();
      const searchTerms = searchTerm.split(/\s+/).filter(word => word.length > 2 || word === searchTerm); // words > 2 chars
      
      const found: any[] = [];

      // 0. AI/Quick Answers
      const isContactQuery = searchTerms.some(term => ['contact', 'phone', 'number', 'call', 'whatsapp', 'reach'].includes(term));
      if (isContactQuery) {
        found.push({
          type: 'AI Answer',
          title: 'Contact Information',
          desc: "You can reach us at 0331314853 via Call or WhatsApp, available 24/7. We are ready to help!",
          link: 'https://wa.me/923152227331'
        });
      }
      
      const isEmailQuery = searchTerms.some(term => ['email', 'mail'].includes(term));
      if (isEmailQuery) {
        found.push({
          type: 'AI Answer',
          title: 'Email Address',
          desc: "Our official email address is info@decentdisposal.pk. Send us your inquiry!",
          link: 'mailto:info@decentdisposal.pk'
        });
      }
      
      const isAddressQuery = searchTerms.some(term => ['address', 'location', 'where', 'office', 'situated', 'place'].includes(term));
      if (isAddressQuery) {
        found.push({
          type: 'AI Answer',
          title: 'Office Address',
          desc: "We are located at B-38, Estate Avenue, SITE Area, Karachi, Pakistan. Feel free to visit us!",
          link: '/#contact'
        });
      }
      
      // FAQ Search
      FAQS.forEach(faq => {
        const matchesFaq = searchTerms.some(term => faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term));
        const hasFaqKeyword = searchTerms.some(term => ['faq', 'faqs', 'question', 'questions', 'answers'].includes(term));
        
        if (matchesFaq || hasFaqKeyword) {
           if (!found.find(f => f.title === faq.q)) {
             found.push({
               type: 'FAQ Answer',
               title: faq.q,
               desc: faq.a,
               link: '#'
             });
           }
        }
      });
      
      // 1. Search Static Pages
      const pages = [
        { title: 'Home', path: '/', desc: 'Professional Corporate Turnkey Solutions' },
        { title: 'Process', path: '/process', desc: 'Our Working Process and Steps' },
        { title: 'Portfolio', path: '/portfolio', desc: 'View Our Latest Projects' },
        { title: 'About Us', path: '/about-company', desc: 'Learn more about Decent Disposal' },
        { title: 'Scrap Rates', path: '/scrap-rates', desc: 'Daily Updated Scrap Material Rates' },
        { title: 'Quote', path: '/quote', desc: 'Request a Free Quote / Free Survey' },
      ];
      
      pages.forEach(page => {
        const matchesPage = searchTerms.some(term => page.title.toLowerCase().includes(term) || page.desc.toLowerCase().includes(term));
        if (matchesPage || searchTerm.includes(page.title.toLowerCase())) {
          found.push({ type: 'Page', title: page.title, desc: page.desc, link: page.path });
        }
      });

      // 2. Search Services
      SERVICES.forEach(service => {
        const matchesService = searchTerms.some(term => 
          service.title.toLowerCase().includes(term) || 
          service.desc.toLowerCase().includes(term) ||
          service.descRoman.toLowerCase().includes(term) ||
          (service.titleUr && service.titleUr.includes(term))
        );
        if (matchesService) {
          found.push({ 
            type: 'Service', 
            title: service.title, 
            desc: service.desc, 
            link: `/service/${service.id}` 
          });
        }
      });

      // 3. Search Blog Posts (Firestore)
      try {
        const postsRef = collection(db, 'posts');
        const qSnap = await getDocs(query(postsRef, orderBy('createdAt', 'desc')));
        qSnap.forEach(doc => {
          const data = doc.data();
          const matchesBlog = searchTerms.some(term => 
            (data.title && data.title.toLowerCase().includes(term)) ||
            (data.excerpt && data.excerpt.toLowerCase().includes(term)) ||
            (data.content && data.content.toLowerCase().includes(term))
          );
          if (matchesBlog) {
            found.push({
              type: 'Blog',
              title: data.title,
              desc: data.excerpt || 'Read more in this blog post',
              link: `/blog/${doc.id}`
            });
          }
        });
      } catch (err) {
        console.error("Error searching blog posts:", err);
      }

      // 4. Smart AI Fallback if no specific matches found or if conversational
      if (found.length === 0) {
        const greetings = ['hi', 'hello', 'hey', 'salam', 'assalam', 'hi there'];
        const about = ['who', 'what', 'about', 'company', 'decent'];
        
        let aiResponse = `I see you are searching for "${q}". We specialize in Premium Office Renovation, Asset Management, and Industrial Scrap Relocation. We can definitely assist you with related services!`;
        
        if (searchTerms.some(term => greetings.some(g => g.includes(term)))) {
          aiResponse = "Hello! I am the Decent Disposal AI Assistant. We are Pakistan's premium corporate turnkey solutions provider. Are you looking for Office Renovation, Scrap Management, or Asset Relocation services?";
        } else if (searchTerms.some(term => about.includes(term))) {
          aiResponse = "Decent Disposal is a premium asset management and renovation company based in Karachi. We specialize in transforming corporate spaces and providing high-value scrap management services.";
        }

        found.push({
          type: 'AI Assistant',
          title: `Looking for something specific?`,
          desc: aiResponse,
          link: '/#contact'
        });
      }

      // De-duplicate results roughly by title
      const uniqueFound = found.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i);

      setResults(uniqueFound);
      setIsSearching(false);
    }

    performSearch();
  }, [q]);

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
        <p className="text-gray-400">Showing results for: <span className="text-yellow-400 font-medium">"{q}"</span></p>
      </motion.div>

      {isSearching ? (
        <div className="text-gray-400 flex items-center gap-2">
          <Search className="animate-spin w-5 h-5 text-yellow-400" /> Searching...
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {results.map((item, idx) => {
            const isAI = item.type === 'AI Answer' || item.type === 'FAQ Answer' || item.type === 'AI Assistant';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {item.link === '#' ? (
                  <div className={`block p-6 rounded-xl border transition-all ${isAI ? 'bg-indigo-950/30 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-[#111] border-white/5'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 ${isAI ? 'text-indigo-400' : 'text-yellow-400'}`}>
                          {isAI && <Bot className="w-4 h-4" />}
                          {item.type}
                        </span>
                        <h2 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h2>
                        <p className={`text-sm leading-relaxed ${isAI ? 'text-indigo-200/80 font-medium font-sans' : 'text-gray-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.link}
                    target={item.link.startsWith('http') ? "_blank" : undefined}
                    className={`block p-6 rounded-xl border transition-all group ${isAI ? 'bg-indigo-950/30 border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-[#111] border-white/5 hover:border-yellow-400/50 hover:bg-[#1a1a1a]'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 ${isAI ? 'text-indigo-400' : 'text-yellow-400'}`}>
                          {isAI && <Bot className="w-4 h-4" />}
                          {item.type}
                        </span>
                        <h2 className={`text-xl font-bold text-white mb-2 transition-colors ${isAI ? 'group-hover:text-indigo-300' : 'group-hover:text-yellow-400'}`}>
                          {item.title}
                        </h2>
                        <p className={`text-sm leading-relaxed ${isAI ? 'text-indigo-200/80 font-medium font-sans' : 'text-gray-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all ${isAI ? 'bg-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white' : 'bg-yellow-400/10 group-hover:bg-yellow-400 group-hover:text-black'}`}>
                        {item.link.startsWith('http') ? <ExternalLink className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/5">
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
          <p className="text-gray-400 mb-6">We couldn't find anything matching "{q}".</p>
          <Link to="/" className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors">
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}
