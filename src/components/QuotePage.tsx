import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';
import { Scale, HardHat, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSiteSettings } from '@/src/lib/SiteContext';

interface RenovationLead {
  fullName: string;
  phone: string;
  email: string;
  corporateName: string;
  serviceType: string;
  budget: string;
  projectDetails: string;
}

interface ScrapLead {
  fullName: string;
  phone: string;
  email: string;
  scrapType: string;
  quantity: string;
  addressMessage: string;
}

export default function QuotePage() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const siteSettings = useSiteSettings();

  const [isRenovationSubmitting, setIsRenovationSubmitting] = useState(false);
  const [isScrapSubmitting, setIsScrapSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<{ type: 'renovation' | 'scrap'; data: any } | null>(null);

  const contactPhone = siteSettings?.phone1 || "0331 3141853";
  const contactEmail = siteSettings?.adminEmail || "ahmed786awan@gmail.com";
  const waTarget = contactPhone.replace(/[^0-9]/g, '');

  const { register: regRen, handleSubmit: subRen, formState: { errors: errRen, isValid: isRenValid } } = useForm<RenovationLead>({
    mode: 'onChange'
  });
  
  const { register: regScrap, handleSubmit: subScrap, formState: { errors: errScrap, isValid: isScrapValid } } = useForm<ScrapLead>({
    mode: 'onChange'
  });

  const onRenovationSubmit = async (data: RenovationLead) => {
    setIsRenovationSubmitting(true);
    const loadingToast = toast.loading("Submitting your renovation request...");
    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'renovation', data })
      });
      
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Server error");

      toast.success("Renovation request sent!", { id: loadingToast });
      setSuccessLead({ type: 'renovation', data });
    } catch (error: any) {
      toast.error(error.message || "Failed, try again", { id: loadingToast });
    } finally {
      setIsRenovationSubmitting(false);
    }
  };

  const onScrapSubmit = async (data: ScrapLead) => {
    setIsScrapSubmitting(true);
    const loadingToast = toast.loading("Submitting your scrap inquiry...");
    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'scrap', data })
      });
      
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Server error");

      toast.success("Scrap inquiry sent!", { id: loadingToast });
      setSuccessLead({ type: 'scrap', data });
    } catch (error: any) {
      toast.error(error.message || "Failed, try again", { id: loadingToast });
    } finally {
      setIsScrapSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    if (!successLead) return;
    const cleanNum = waTarget.startsWith('0') ? '92' + waTarget.substring(1) : waTarget;
    const msg = encodeURIComponent(`Hi Decent Disposal, I just submitted a ${successLead.type} request on your website. My name is ${successLead.data.fullName}.`);
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 selection:bg-primary-blue selection:text-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="text-center mb-16 space-y-4">
           <h1 className="text-4xl md:text-5xl font-black text-gray-900 font-montserrat uppercase tracking-tight">
             Request a <span className="text-primary-blue">Custom Quote</span>
           </h1>
           <p className="text-gray-500 max-w-2xl mx-auto">
             Stable and transparent solutions for Karachi's corporate sector. Submit your inquiry below and our experts will contact you.
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Renovation Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-2 h-full bg-primary-blue"></div>
             <div className="flex items-center gap-3 mb-8">
                <HardHat className="w-8 h-8 text-primary-blue" />
                <h2 className="text-2xl font-black text-gray-900 font-montserrat uppercase">Office Renovation</h2>
             </div>
             
             <form onSubmit={subRen(onRenovationSubmit)} className="space-y-6">
                <FormInput register={regRen('fullName', { required: "Name is required" })} label="Full Name *" placeholder="Your name" error={errRen.fullName?.message} />
                <FormInput register={regRen('phone', { required: "Phone is required" })} label="Phone *" placeholder="e.g. 0331 3141853" error={errRen.phone?.message} />
                <FormInput register={regRen('email')} label="Email Address" placeholder="Email (optional)" />
                <FormInput register={regRen('corporateName')} label="Corporate Name" placeholder="Company Name" />
                <FormInput register={regRen('serviceType', { required: "Please select service" })} label="Service Required *" type="select" options={['Glass Work', 'Ceiling', 'Electrical', 'Painting', 'Woodwork', 'Other']} error={errRen.serviceType?.message} />
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400">Project details *</label>
                   <textarea {...regRen('projectDetails', { required: "Details are required" })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-blue outline-none h-32 resize-none placeholder:text-black" placeholder="Brief about your request..." />
                   {errRen.projectDetails && <p className="text-red-500 text-[10px] font-bold uppercase">{errRen.projectDetails.message}</p>}
                </div>
                <button 
                  disabled={!isRenValid || isRenovationSubmitting}
                  className="w-full bg-primary-blue text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-xl disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                >
                   {isRenovationSubmitting ? "Submitting..." : "Get Free Quote"}
                </button>
             </form>
          </motion.div>

          {/* Scrap Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-2 h-full bg-primary-green"></div>
             <div className="flex items-center gap-3 mb-8">
                <Scale className="w-8 h-8 text-primary-green" />
                <h2 className="text-2xl font-black text-gray-900 font-montserrat uppercase">Sell Your Scrap Now</h2>
             </div>
             
             <form onSubmit={subScrap(onScrapSubmit)} className="space-y-6">
                <FormInput register={regScrap('fullName', { required: "Name is required" })} label="Full Name *" placeholder="Your name" error={errScrap.fullName?.message} />
                <FormInput register={regScrap('phone', { required: "Phone is required" })} label="Phone *" placeholder="e.g. 0310 2617722" error={errScrap.phone?.message} />
                <FormInput register={regScrap('email')} label="Email Address" placeholder="Email (optional)" />
                <FormInput register={regScrap('scrapType', { required: "Select scrap type" })} label="Scrap Type *" type="select" options={['Copper', 'Iron', 'Aluminum', 'E-Waste', 'Cables', 'Other']} error={errScrap.scrapType?.message} />
                <FormInput register={regScrap('quantity')} label="Approxi. Quantity" placeholder="e.g. 100kg" />
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-gray-400">Address / Description *</label>
                   <textarea {...regScrap('addressMessage', { required: "Address/Info required" })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-green outline-none h-32 resize-none placeholder:text-black" placeholder="Pickup location and items..." />
                   {errScrap.addressMessage && <p className="text-red-500 text-[10px] font-bold uppercase">{errScrap.addressMessage.message}</p>}
                </div>
                <button 
                  disabled={!isScrapValid || isScrapSubmitting}
                  className="w-full bg-primary-green text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-xl disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                >
                   {isScrapSubmitting ? "Submitting..." : "Book Pickup Inquiry"}
                </button>
             </form>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-20 bg-dark-bg p-8 md:p-12 rounded-[30px] md:rounded-[40px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 text-center border border-white/5 shadow-2xl overflow-hidden w-full max-w-full">
           <div className="w-full">
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Direct Phone</p>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-white md:tracking-widest">{contactPhone}</p>
           </div>
           <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
           <div className="w-full">
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Email Official</p>
              <p className="text-base sm:text-lg md:text-2xl font-black text-white md:tracking-widest break-words overflow-wrap-normal bg-clip-text w-full px-2" style={{wordBreak: "break-word"}}>{contactEmail}</p>
           </div>
        </div>
      </div>

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

function FormInput({ label, placeholder, register, type = 'text', error, options }: any) {
  return (
    <div className="space-y-2">
       <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
       {type === 'select' ? (
         <select {...register} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm text-gray-900 focus:border-black outline-none transition-all cursor-pointer placeholder:text-black">
           <option value="">Choose option...</option>
           {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
         </select>
       ) : (
         <input {...register} type={type} placeholder={placeholder} className={cn("w-full bg-gray-50 border rounded-xl px-4 py-4 text-sm text-gray-900 outline-none transition-all placeholder:text-black", error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black")} />
       )}
       {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1">{error}</p>}
    </div>
  );
}
