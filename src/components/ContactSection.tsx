import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactLead } from '@/src/lib/schemas';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createLead, subscribeToSettings } from '@/src/lib/db';

export default function ContactSection() {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState<any>(null);
  const isUrdu = i18n.language === 'ur';

  useEffect(() => {
    return subscribeToSettings(setSettings);
  }, []);

  const phone = settings?.phone1 || "03313141853";
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waNum = cleanPhone.startsWith('0') ? '92' + cleanPhone.substring(1) : cleanPhone;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactLead>({
    resolver: zodResolver(contactSchema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactLead) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting inquiry...");
    try {
      await createLead({
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message
      });
      
      toast.success("Inquiry received! We'll call you soon.", { id: loadingToast });
      reset();
    } catch (error: any) {
      toast.error("Submission failed. Please try WhatsApp.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-poppins py-20 px-[5%]">
       {/* Background */}
       <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=1600" 
            className="w-full h-full object-cover animate-zoom-bg" 
            alt="Premium Interior" 
          />
          <div className="absolute inset-0 bg-black/60" />
       </div>

       <div className={cn("flex flex-col lg:flex-row w-full max-w-7xl gap-16 items-center z-10", isUrdu && "lg:flex-row-reverse")}>
          {/* Left Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex-[1.2] w-full"
          >
             <div className="glass-form p-10">
                <h2 className={cn("text-3xl font-bold text-white mb-8", isUrdu && "urdu-text text-4xl")}>
                   {isUrdu ? "مفت کوٹیشن حاصل کریں" : "Get a Free Quote"}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Full Name</label>
                          <input 
                            {...register('name')}
                            type="text" 
                            placeholder={isUrdu ? "آپ کا نام" : "Full Name"} 
                            className={cn("w-full bg-white/10 border rounded-[10px] px-4 py-3 text-white outline-none focus:border-primary-blue transition-all", errors.name ? "border-red-500" : "border-white/20")}
                          />
                          {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.name.message}</p>}
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Phone Number</label>
                          <input 
                            {...register('phone')}
                            type="tel" 
                            placeholder={isUrdu ? "مثال: 0331 3141853" : "e.g. 0331 3141853"} 
                            className={cn("w-full bg-white border rounded-[10px] px-4 py-3 text-black placeholder:text-black outline-none focus:border-primary-blue transition-all", errors.phone ? "border-red-500" : "border-gray-200")}
                          />
                          {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.phone.message}</p>}
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Email Address</label>
                       <input 
                          {...register('email')}
                          type="email" 
                          placeholder={isUrdu ? "آپ کی ای میل" : "email@example.com"} 
                          className={cn("w-full bg-white/10 border rounded-[10px] px-4 py-3 text-white outline-none focus:border-primary-blue transition-all", errors.email ? "border-red-500" : "border-white/20")}
                       />
                       {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.email.message}</p>}
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Service Type</label>
                       <select 
                          {...register('service')}
                          className={cn("w-full bg-white/10 border rounded-[10px] px-4 py-3 text-white outline-none focus:border-primary-blue transition-all appearance-none cursor-pointer", errors.service ? "border-red-500" : "border-white/20")}
                       >
                          <option value="" className="bg-dark-bg">{isUrdu ? "سروس منتخب کریں" : "Select Service"}</option>
                          <option value="renovation" className="bg-dark-bg">Office Renovation</option>
                          <option value="scrap" className="bg-dark-bg">Scrap Buying</option>
                       </select>
                       {errors.service && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.service.message}</p>}
                    </div>

                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Message Details</label>
                       <textarea 
                          {...register('message')}
                          placeholder={isUrdu ? "پروجیکٹ کی تفصیلات" : "Project Details"} 
                          className={cn("w-full bg-white/10 border rounded-[10px] px-4 py-3 text-white h-32 outline-none focus:border-primary-blue transition-all resize-none", errors.message ? "border-red-500" : "border-white/20")}
                       />
                       {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.message.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#00e6a8] hover:bg-white text-black font-bold py-4 rounded-[10px] uppercase transition-all hover:-translate-y-1 disabled:opacity-50"
                    >
                       {isSubmitting ? "Submitting..." : (isUrdu ? "ارسال کریں" : "Submit Request")}
                    </button>
                </form>
             </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex-[0.8] w-full flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
             <div className="border-l-4 border-[#00e6a8] pl-6">
                <p className={cn("text-white text-lg leading-relaxed font-poppins", isUrdu && "urdu-text text-xl")}>
                   {isUrdu 
                     ? "ہم جدید گلاس اور لکڑی کے کام کے ساتھ جگہوں کو تبدیل کرتے ہیں۔ آپ کے لائف اسٹائل کے مطابق پریمیم رینوویشن سروسز۔ تیز، قابل اعتماد اور سستی۔"
                     : "We transform spaces with modern glass and wood work. Premium renovation services tailored to your lifestyle. Fast, reliable, and affordable."
                   }
                </p>
             </div>

             <div className="w-[220px] h-[440px] rounded-[35px] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-4 animate-float shadow-2xl relative">
                <a 
                   href={`https://wa.me/${waNum}`} 
                   target="_blank" 
                   rel="noopener" 
                   className="flex flex-col items-center gap-3 text-white no-underline text-center group"
                >
                   <MessageCircle className="w-16 h-16 text-[#25D366] fill-green-500/20 group-hover:scale-110 transition-transform" />
                   <span className="font-bold text-xl block">WhatsApp Us</span>
                   <p className="text-[11px] opacity-80 uppercase tracking-widest font-black">Available 24/7</p>
                </a>
                
                <div className="absolute top-4 w-12 h-1.5 bg-white/20 rounded-full" />
                <div className="absolute bottom-6 w-8 h-8 border border-white/20 rounded-full" />
             </div>
          </div>
       </div>

       <style>{`
          @keyframes zoom-bg {
             0%, 100% { transform: scale(1); }
             50% { transform: scale(1.1); }
          }
          .animate-zoom-bg { animation: zoom-bg 20s ease-in-out infinite alternate; }
       `}</style>
    </section>
  );
}
