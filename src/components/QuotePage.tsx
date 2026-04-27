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
                <h2 className="text-2xl font-black text-gray-900 font-montserrat uppercase">Scrap Purchasing</h2>
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

        <div className="mt-20 bg-dark-bg p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center border border-white/5 shadow-2xl">
           <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Direct Phone</p>
              <p className="text-xl md:text-2xl font-black text-white tracking-widest">{contactPhone}</p>
           </div>
           <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
           <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Email Official</p>
              <p className="text-xl md:text-2xl font-black text-white tracking-widest">{contactEmail}</p>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {successLead && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSuccessLead(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white rounded-[40px] p-10 md:p-12 max-w-lg w-full relative shadow-2xl text-center">
              <button onClick={() => setSuccessLead(null)} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X className="w-6 h-6" /></button>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-green-600" /></div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter tracking-widest">Submission OK</h3>
              <p className="text-gray-600 mb-10 leading-relaxed font-bold">We will contact you shortly.</p>
              <button onClick={handleWhatsAppChat} className="w-full bg-whatsapp text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl active:scale-95"><MessageCircle className="w-6 h-6" /> WhatsApp Support</button>
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
