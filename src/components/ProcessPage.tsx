import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Smartphone, Truck, Scale, Banknote, ShieldCheck, Zap, Clock, ThumbsUp, ArrowRight, HardHat, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { renovationSchema, scrapSchema, type RenovationLead, type ScrapLead } from '@/src/lib/schemas';

const STEPS = [
  {
    id: 1,
    title: 'Order Book Karein',
    titleUr: 'آرڈر بک کریں',
    desc: 'Apna address aur time schedule karein. Humari team aap se rabta karegi.',
    descUr: 'اپنا ایڈریس اور ٹائم شیڈول کریں۔ ہماری ٹیم آپ سے رابطہ کرے گی۔',
    icon: <Smartphone className="w-10 h-10" />,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Doorstep Pickup',
    titleUr: 'ڈور اسٹیپ پک اپ',
    desc: 'Humari team aapki location par aayegi. Aapko kahin jane ki zaroorat nahi.',
    descUr: 'ہماری ٹیم آپ کی لوکیشن پر آئے گی۔ آپ کو کہیں جانے کی ضرورت نہیں۔',
    icon: <Truck className="w-10 h-10" />,
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Digital Weight',
    titleUr: 'ڈیجیٹل وزن',
    desc: 'Hum **Advanced Digital Scales** ka istemal karte hain taake aapko mile 100% sahi wazan.',
    descUr: 'ہم ایڈوانسڈ ڈیجیٹل اسکیلز کا استعمال کرتے ہیں تاکہ آپ کو ملے 100٪ صحیح وزن۔',
    icon: <Scale className="w-10 h-10" />,
    color: 'bg-yellow-500',
    tech: 'Calibrated digital sensors for zero error.'
  },
  {
    id: 4,
    title: 'Instant Payment',
    titleUr: 'فوری ادائیگی',
    desc: 'Wazan ke baad foran digital receipt aur aapki raqam aapko de di jayegi.',
    descUr: 'وزن کے بعد فوراً ڈیجیٹل رسید اور آپ کی رقم آپ کو دے دی جائے گی۔',
    icon: <Banknote className="w-10 h-10" />,
    color: 'bg-purple-500'
  }
];

const WHY_US = [
  { title: 'Transparency', icon: <ShieldCheck className="w-6 h-6" />, desc: 'Live weighing on digital scales in front of you.' },
  { title: 'Efficiency', icon: <Zap className="w-6 h-6" />, desc: 'Quick turnaround time from booking to payment.' },
  { title: 'Professionalism', icon: <Clock className="w-6 h-6" />, desc: 'Expert team handled over 500+ corporate projects.' },
  { title: 'Customer Satisfaction', icon: <ThumbsUp className="w-6 h-6" />, desc: 'Rated 5-stars by industrial and residential clients.' }
];

export default function ProcessPage() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const [isScrapSubmitting, setIsScrapSubmitting] = useState(false);
  const [isRenovationSubmitting, setIsRenovationSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<{ type: 'renovation' | 'scrap'; data: any } | null>(null);

  const scrapForm = useForm<ScrapLead>({ resolver: zodResolver(scrapSchema) });
  const renovationForm = useForm<RenovationLead>({ resolver: zodResolver(renovationSchema) });

  const onScrapSubmit = async (data: ScrapLead) => {
    setIsScrapSubmitting(true);
    const loadingToast = toast.loading("Submitting your scrap inquiry...");
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'scrap', data })
      });
      const result = await response.json().catch(() => ({ success: false, error: "Server returned non-JSON response" }));
      if (!response.ok || !result.success) throw new Error(result.error || `Server error: ${response.status}`);
      toast.success("Scrap inquiry sent!", { id: loadingToast });
      setSuccessLead({ type: 'scrap', data });
      scrapForm.reset();
    } catch (error: any) {
      toast.error(error.message || "Submission failed", { id: loadingToast });
    } finally {
      setIsScrapSubmitting(false);
    }
  };

  const onRenovationSubmit = async (data: RenovationLead) => {
    setIsRenovationSubmitting(true);
    const loadingToast = toast.loading("Submitting your renovation request...");
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'renovation', data })
      });
      const result = await response.json().catch(() => ({ success: false, error: "Server returned non-JSON response" }));
      if (!response.ok || !result.success) throw new Error(result.error || `Server error: ${response.status}`);
      toast.success("Renovation request sent!", { id: loadingToast });
      setSuccessLead({ type: 'renovation', data });
      renovationForm.reset();
    } catch (error: any) {
      toast.error(error.message || "Submission failed", { id: loadingToast });
    } finally {
      setIsRenovationSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    if (!successLead) return;
    const adminNum = "923152227331";
    const msg = encodeURIComponent(
      `*New ${successLead.type === 'renovation' ? 'Renovation' : 'Scrap'} Lead*\n\n` +
      `*Name:* ${successLead.data.fullName}\n` +
      `*Phone:* ${successLead.data.phone}\n` +
      `*Message:* ${successLead.type === 'renovation' ? successLead.data.projectDetails : successLead.data.addressMessage}`
    );
    window.open(`https://wa.me/${adminNum}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 overflow-hidden selection:bg-primary-green selection:text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-7xl mb-24 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
        >
          <h1 className={cn("text-4xl md:text-6xl font-black text-gray-900 font-montserrat uppercase leading-tight", isUrdu && "urdu-text")}>
            Our Smooth <span className="text-primary-green">Working Process</span>
          </h1>
          <p className={cn("text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed", isUrdu && "urdu-text")}>
            At Decent Disposal, we prioritize transparency and speed. Our 4-step process ensures that you get the best value for your scrap item or renovation site with zero hassle.
          </p>
        </motion.div>
      </section>

      {/* Steps Table/Grid Omitted for space in this rewrite, assuming original code block below is preserved */}
      {/* (Preserving STEPS map logic) */}
      <section className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden lg:block z-0"></div>
          {STEPS.map((step, index) => (
            <motion.div key={step.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative z-10">
              <Link to="/quote" className="bg-white p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-4 transition-all duration-500 w-full h-full block">
                <div className={cn("w-24 h-24 rounded-full flex items-center justify-center text-white mb-8 shadow-xl group-hover:rotate-12 transition-transform duration-500", step.color)}>
                  {step.icon}
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center font-black text-xl text-gray-300 group-hover:bg-primary-green group-hover:text-white transition-colors">
                  {step.id}
                </div>
                <h3 className={cn("text-2xl font-bold text-gray-900 mb-4", isUrdu && "urdu-text text-3xl")}>{isUrdu ? step.titleUr : step.title}</h3>
                <p className={cn("text-gray-500 text-sm leading-relaxed mb-6", isUrdu && "urdu-text text-base")}>{isUrdu ? step.descUr : step.desc}</p>
                {step.tech && (
                  <div className="mt-auto flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-100">
                    <Zap className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                    <span className="text-[10px] font-black uppercase text-yellow-700 tracking-wider font-montserrat">{step.tech}</span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Factors (Preserved) */}
      <section className="bg-gray-900 py-32">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase">Why Businesses <span className="text-primary-green">Choose Us</span></h2>
                    <p className="text-gray-400 leading-relaxed">We combine years of experience in Karachi's industrial market with modern technology to provide a service that is both reliable and professional.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {WHY_US.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-green flex-shrink-0 group-hover:bg-primary-green group-hover:text-white transition-colors">{item.icon}</div>
                         <div>
                            <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight text-sm font-montserrat">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="aspect-square rounded-[60px] overflow-hidden border-8 border-white/5 relative">
                    <img src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Modern Warehouse" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                       <p className="text-3xl font-black text-white mb-2 italic">No Hidden Cuts.</p>
                       <p className="text-primary-green font-bold text-sm tracking-widest uppercase">Verified and Calibrated Systems</p>
                    </div>
                 </div>
                 <div className="absolute -top-10 -right-10 bg-primary-green p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center shadow-2xl animate-float">
                    <p className="text-4xl font-black text-white">10k+</p>
                    <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Verified Deals</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Forms Section (Migrated to new lead logic) */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
         <div className="container mx-auto px-6 max-w-7xl">
            <header className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase font-montserrat tracking-tight mb-4">Ready to <span className="text-primary-green">Partner With Us?</span></h2>
               <p className="text-gray-500">Choose your service and our team will get back to you within 2 business hours.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Scrap Form */}
               <motion.div id="scrap-form" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-green"></div>
                  <div className="flex items-center gap-3 mb-8"><Scale className="w-8 h-8 text-primary-green" /><h2 className="text-2xl font-black text-gray-900 font-montserrat uppercase">Scrap Disposal Request</h2></div>
                  <form onSubmit={scrapForm.handleSubmit(onScrapSubmit)} className="space-y-6">
                     <FormGroup register={scrapForm.register('fullName')} label="Full Name" placeholder="Enter your full name" error={scrapForm.formState.errors.fullName?.message} />
                     <FormGroup register={scrapForm.register('phone')} label="Phone Number" placeholder="e.g. 0331 3141853" type="tel" error={scrapForm.formState.errors.phone?.message} />
                     <FormGroup register={scrapForm.register('email')} label="Email Address" placeholder="yourname@gmail.com" type="email" error={scrapForm.formState.errors.email?.message} />
                     <FormGroup register={scrapForm.register('quantity')} label="Estimated Quantity" placeholder="e.g. 100kg" error={scrapForm.formState.errors.quantity?.message} />
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Scrap Type</label>
                        <select {...scrapForm.register('scrapType')} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-green outline-none placeholder:text-black">
                           <option value="">-- Select Scrap Type --</option>
                           <option value="iron">Iron & Heavy Metals</option>
                           <option value="copper">Copper & Electrical</option>
                           <option value="it">Office IT & E-Waste</option>
                           <option value="machinery">Industrial Machinery</option>
                        </select>
                        {scrapForm.formState.errors.scrapType?.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{scrapForm.formState.errors.scrapType.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Pickup Address & Instructions</label>
                        <textarea {...scrapForm.register('addressMessage')} placeholder="Your location details..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 h-32 focus:border-primary-green outline-none resize-none placeholder:text-black"></textarea>
                        {scrapForm.formState.errors.addressMessage?.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{scrapForm.formState.errors.addressMessage.message}</p>}
                     </div>
                     <button type="submit" disabled={isScrapSubmitting} className="w-full bg-primary-green text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl disabled:opacity-50">
                        {isScrapSubmitting ? "Submitting..." : "Schedule Doorstep Weight"}
                     </button>
                  </form>
               </motion.div>
               {/* Renovation Form */}
               <motion.div id="renovation-form" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-blue"></div>
                  <div className="flex items-center gap-3 mb-8"><HardHat className="w-8 h-8 text-primary-blue" /><h2 className="text-2xl font-black text-gray-900 font-montserrat uppercase">Interior & Renovation</h2></div>
                  <form onSubmit={renovationForm.handleSubmit(onRenovationSubmit)} className="space-y-6">
                     <FormGroup register={renovationForm.register('fullName')} label="Full Name" placeholder="Enter your full name" error={renovationForm.formState.errors.fullName?.message} />
                     <FormGroup register={renovationForm.register('phone')} label="Phone Number" placeholder="e.g. 0331 3141853" type="tel" error={renovationForm.formState.errors.phone?.message} />
                     <FormGroup register={renovationForm.register('email')} label="Email Address" placeholder="example@mail.com" type="email" error={renovationForm.formState.errors.email?.message} />
                     <FormGroup register={renovationForm.register('corporateName')} label="Corporate Name" placeholder="Your company name" error={renovationForm.formState.errors.corporateName?.message} />
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Project Type</label>
                        <select {...renovationForm.register('serviceType')} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-blue outline-none placeholder:text-black">
                           <option value="">-- Choose project type --</option>
                           <option value="office">Office Refurbishment</option>
                           <option value="glass">Glass & Partitioning</option>
                           <option value="ceiling">False Ceiling & Civil</option>
                           <option value="dismantling">Full Site Dismantling</option>
                        </select>
                        {renovationForm.formState.errors.serviceType?.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{renovationForm.formState.errors.serviceType.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Requirements Summary</label>
                        <textarea {...renovationForm.register('projectDetails')} placeholder="Briefly describe your site needs..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 h-32 focus:border-primary-blue outline-none resize-none placeholder:text-black"></textarea>
                        {renovationForm.formState.errors.projectDetails?.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{renovationForm.formState.errors.projectDetails.message}</p>}
                     </div>
                     <button type="submit" disabled={isRenovationSubmitting} className="w-full bg-primary-blue text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl disabled:opacity-50">
                        {isRenovationSubmitting ? "Submitting..." : "Request Expert Site Visit"}
                     </button>
                  </form>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {successLead && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSuccessLead(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-12 max-w-[95%] sm:max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl text-center border border-gray-100 mx-auto">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              <button onClick={() => setSuccessLead(null)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 relative mt-2 sm:mt-0">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 sm:mb-4 tracking-tight">Request Received!</h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed font-medium text-sm sm:text-base md:text-lg px-2 sm:px-4">
                Thank you for choosing Decent Disposal. Our experts are reviewing your details.
              </p>
              
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100 text-left">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Fast-Track Your Request
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                  Want an immediate quote? Send us a message on WhatsApp with pictures of your items or project site for a faster response.
                </p>
                <button onClick={handleWhatsAppChat} className="w-full bg-[#25D366] text-white py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 font-bold hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-sm sm:text-base">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Chat on WhatsApp Now
                </button>
              </div>

              <button onClick={() => setSuccessLead(null)} className="text-gray-400 font-medium hover:text-gray-600 text-xs sm:text-sm underline underline-offset-4 pb-2 sm:pb-0">Skip for now</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormGroup({ label, placeholder, register, type = 'text', error }: { label: string, placeholder: string, register?: any, type?: string, error?: string }) {
  return (
    <div className="space-y-2">
       <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
       <input {...(register || {})} type={type} placeholder={placeholder} className={cn("w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-black", error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")} />
       {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">{error}</p>}
    </div>
  );
}
