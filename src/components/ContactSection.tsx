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

  const phone = settings?.phone1 || "03152227331 (Tanveer)";
  const phone2 = settings?.phone2 || "0331314853";
  const waNum = "923152227331";

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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
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
                            placeholder={isUrdu ? "مثال: 0331314853" : "e.g. 0331314853"} 
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

             <div className="w-full h-[440px] rounded-[35px] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col overflow-hidden shadow-2xl relative">
                <div className="flex-1 w-full relative">
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.3804828114565!2d67.0345679!3d24.8848419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5b3060c231%3A0x1d4d39e248b1d9c3!2sM.A%20Jinnah%20Rd%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                   ></iframe>
                </div>
                <div className="p-4 bg-black/60 flex items-center justify-between">
                   <div className="text-left max-w-[200px]">
                      <h4 className="font-bold text-white text-sm">Decent Disposal</h4>
                      <p className="text-white/70 text-[10px] leading-tight mt-1">M.A Jinnah Road, Gulshan-e-Zahoor, Numaish, Karachi</p>
                   </div>
                   <a 
                      href={`https://wa.me/${waNum}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white p-3 rounded-full transition-all group"
                      title="WhatsApp Us"
                   >
                      <MessageCircle className="w-6 h-6" />
                   </a>
                </div>
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
