import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ArrowRight, ExternalLink } from 'lucide-react';
import { SERVICES } from './ServiceGrid';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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
      
      const found: any[] = [];
      
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
        if (page.title.toLowerCase().includes(searchTerm) || page.desc.toLowerCase().includes(searchTerm)) {
          found.push({ type: 'Page', title: page.title, desc: page.desc, link: page.path });
        }
      });

      // 2. Search Services
      SERVICES.forEach(service => {
        if (
          service.title.toLowerCase().includes(searchTerm) || 
          service.desc.toLowerCase().includes(searchTerm) ||
          service.descRoman.toLowerCase().includes(searchTerm) ||
          (service.titleUr && service.titleUr.includes(searchTerm))
        ) {
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
          if (
            (data.title && data.title.toLowerCase().includes(searchTerm)) ||
            (data.excerpt && data.excerpt.toLowerCase().includes(searchTerm)) ||
            (data.content && data.content.toLowerCase().includes(searchTerm))
          ) {
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

      setResults(found);
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
          {results.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                to={item.link}
                className="block p-6 rounded-xl bg-[#111] border border-white/5 hover:border-yellow-400/50 hover:bg-[#1a1a1a] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-2 block">
                      {item.type}
                    </span>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                    {item.type === 'External' ? <ExternalLink className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
