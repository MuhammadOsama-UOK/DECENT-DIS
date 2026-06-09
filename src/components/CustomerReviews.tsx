import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, Send, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  textUr?: string;
  date: string;
  isCustom?: boolean;
}

const FAKE_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ali Raza',
    role: 'Factory Owner, Karachi',
    rating: 5,
    text: 'Decent Disposal ne hamari old factory ka scrap bohat achi qeemat pe kharida. Inki team professional hai aur kaam waqt pe khatam kiya.',
    textUr: 'ڈیسنٹ ڈسپوزل نے ہماری پرانی فیکٹری کا سکریپ بہت اچھی قیمت پر خریدا۔ ان کی ٹیم پیشہ ور ہے اور کام بروقت مکمل کیا۔',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Fatima Sheikh',
    role: 'Operations Head, Lahore',
    rating: 5,
    text: 'Excellent service! We relocated our corporate office and they bought all our old workstations and AC units without any hassle. Highly recommended!',
    textUr: 'بہترین سروس! ہم نے اپنا دفتر منتقل کیا اور انہوں نے ہمارے تمام پرانے ورک اسٹیشن اور اے سی بغیر کسی پریشانی کے خرید لیے۔',
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Usman Tariq',
    role: 'Homeowner, Islamabad',
    rating: 5,
    text: 'Mera renovation ka project inhon ne shandar tareeqay se mukammal kiya. Woodwork aur glass partitions ki quality kamaal hai.',
    textUr: 'میرا رینوویشن کا پروجیکٹ انہوں نے شاندار طریقے سے مکمل کیا۔ وڈ ورک اور شیشے کے پارٹیشنز کی کوالٹی کمال ہے۔',
    date: '3 weeks ago'
  },
  {
    id: '4',
    name: 'Naveed Ahmed',
    role: 'Procurement Manager',
    rating: 4,
    text: 'Scrap rates bilkul market k mutabiq thay, aur weighing ka process bilkul transparent tha. Payment fauran mil gayi.',
    textUr: 'سکریپ ریٹس بالکل مارکیٹ کے مطابق تھے، اور وزن کرنے کا عمل بالکل شفاف تھا۔ ادائیگی فوراً مل گئی۔',
    date: '1 week ago'
  }
];

export default function CustomerReviews() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const [reviews, setReviews] = useState<Review[]>(FAKE_REVIEWS);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        role: doc.data().role,
        rating: doc.data().rating,
        text: doc.data().text,
        date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Just now',
        isCustom: true
      })) as Review[];
      
      setReviews([...liveReviews, ...FAKE_REVIEWS]);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        role: role || 'Customer',
        rating,
        text,
        createdAt: serverTimestamp()
      });
      toast.success(isUrdu ? 'آپ کا تبصرہ شامل کر دیا گیا' : 'Review submitted successfully!');
      setName('');
      setRole('');
      setText('');
      setRating(5);
    } catch (error) {
      toast.error(isUrdu ? 'کچھ غلط ہو گیا' : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className={cn("text-center mb-16", isUrdu && "urdu-text")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquareQuote className="w-4 h-4" />
            {isUrdu ? 'گاہکوں کی رائے' : 'Client Testimonials'}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4"
          >
            {isUrdu ? 'لوگ ہمارے بارے میں کیا کہتے ہیں؟' : 'What Our clients say'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reviews List */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn("bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm relative group", isUrdu && "text-right")}
              >
                <div className={cn("flex items-center gap-1 mb-4", isUrdu && "justify-end")}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("w-5 h-5", i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200")} 
                    />
                  ))}
                </div>
                
                <p className={cn("text-gray-700 leading-relaxed mb-6 italic text-lg line-clamp-4", (isUrdu && review.textUr) && "urdu-text")}>
                  "{isUrdu ? (review.textUr || review.text) : review.text}"
                </p>
                
                <div className={cn("flex items-center gap-4 mt-auto", isUrdu && "flex-row-reverse")}>
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("lg:col-span-4 bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-3xl p-8 xl:p-10", isUrdu && "text-right")}
          >
             <h3 className={cn("text-2xl font-black text-gray-900 mb-2 uppercase", isUrdu && "urdu-text")}>
                {isUrdu ? 'اپنی رائے دیں' : 'Leave a Review'}
             </h3>
             <p className={cn("text-gray-500 text-sm mb-6 font-medium", isUrdu && "urdu-text")}>
                {isUrdu ? 'آپ کا تجربہ ہمارے لیے اہم ہے۔' : 'Your experience matters to us.'}
             </p>
             
             <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={cn("block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2", isUrdu && "urdu-text block text-right")}>
                    {isUrdu ? 'نام' : 'Your Name'}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-medium", isUrdu && "text-right")} 
                    placeholder={isUrdu ? 'علی خان' : 'John Doe'}
                  />
                </div>

                <div>
                  <label className={cn("block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2", isUrdu && "urdu-text block text-right")}>
                    {isUrdu ? 'کمپنی / عہدہ' : 'Company / Role (Optional)'}
                  </label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-medium", isUrdu && "text-right")} 
                    placeholder={isUrdu ? 'مینیجر' : 'Manager'}
                  />
                </div>

                <div>
                  <label className={cn("block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2", isUrdu && "urdu-text block text-right")}>
                    {isUrdu ? 'ریٹنگ' : 'Rating'}
                  </label>
                  <div className={cn("flex gap-2", isUrdu && "justify-end")}>
                    {[1,2,3,4,5].map(num => (
                      <button 
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star className={cn("w-8 h-8", num <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200")} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={cn("block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2", isUrdu && "urdu-text block text-right")}>
                    {isUrdu ? 'اپنا تبصرہ لکھیں' : 'Your Review'}
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-medium resize-none", isUrdu && "text-right")}
                    placeholder={isUrdu ? 'ڈیسنٹ ڈسپوزل کی سروس کیسی رہی؟' : 'How was your experience with Decent Disposal?'}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={cn("w-full bg-black text-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2", isUrdu && "flex-row-reverse urdu-text")}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isUrdu ? 'تبصرہ بھیجیں' : 'Submit Review'}
                      <Send className={cn("w-4 h-4", isUrdu && "rotate-180")} />
                    </>
                  )}
                </button>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
