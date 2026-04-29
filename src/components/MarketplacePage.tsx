import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { db } from '@/src/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { 
  Package, 
  Weight, 
  MapPin, 
  MessageCircle, 
  Search,
  ShoppingCart,
  Tags,
  Filter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ScrapListing {
  id: string;
  title: string;
  weight: string;
  price: string;
  location: string;
  imageUrl: string;
  createdAt: any;
}

export default function MarketplacePage() {
  const { t, i18n } = useTranslation();
  const [listings, setListings] = useState<ScrapListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isUrdu = i18n.language === 'ur';

  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, 'selling_scrap'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScrapListing[];
      setListings(docs);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 font-poppins selection:bg-yellow-500 selection:text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Bulk Inventory</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase font-outfit">
                Scrap <span className="text-yellow-500 italic">For Sale</span>
              </h1>
              <p className="text-gray-500 max-w-xl">
                Direct access to Karachi's verified industrial asset liquidations. Bulk quantities of iron, copper, and mixed lots available for authorized buyers.
              </p>
            </div>

            <div className="relative group w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search scrap lots or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-yellow-500 shadow-sm transition-all"
              />
            </div>
          </motion.div>
        </header>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            ) : filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No matching lots found</h3>
                <p className="text-gray-500">Try adjusting your search or check back later for new inventory.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ListingCard(props: any) {
  const { listing } = props;
  const whatsappNumber = "923152227331";
  const whatsappMsg = encodeURIComponent(`Hi Decent Disposal, I am interested in buying the [${listing.title}] listing on your website.`);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={listing.imageUrl || "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=800"} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=800";
          }}
        />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
          <Tags className="w-3 h-3 text-yellow-500" /> Bulk Sale
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-1">{listing.title}</h3>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Asking Offer</p>
            <p className="text-lg font-black text-yellow-600">PKR {listing.price}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <Weight className="w-4 h-4 text-gray-400" />
            </div>
            <span className="font-semibold">{listing.weight} Approx.</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <span className="font-semibold">{listing.location}</span>
          </div>
        </div>

        <button 
          onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, '_blank')}
          className="w-full bg-black hover:bg-yellow-500 text-white hover:text-black font-black py-4 rounded-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 group/btn"
        >
          <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          Submit Bid / Buy
        </button>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-8 space-y-6">
        <div className="flex justify-between">
          <div className="w-1/2 h-8 bg-gray-100 rounded-lg"></div>
          <div className="w-1/4 h-8 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="space-y-3">
          <div className="w-full h-10 bg-gray-50 rounded-xl"></div>
          <div className="w-full h-10 bg-gray-50 rounded-xl"></div>
        </div>
        <div className="w-full h-14 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
}
