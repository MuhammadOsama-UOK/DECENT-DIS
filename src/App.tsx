import { useTranslation } from 'react-i18next';
import './i18n';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import QuotePage from './components/QuotePage';
import ProcessPage from './components/ProcessPage';
import ScrapRatesPage from './components/ScrapRatesPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import AboutCompany from './components/AboutCompany';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import SitemapPage from './components/SitemapPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import { Phone, MapPin, X, Menu, Globe } from 'lucide-react';
import { cn } from './lib/utils';
import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { db } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import { SiteSettingsProvider, useSiteSettings } from './lib/SiteContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import BrandLogo from './components/BrandLogo';

function MainLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUrdu = i18n.language === 'ur';

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ur' : 'en');
  };

  const handleLogoClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    
    const newCount = logoClicks + 1;
    
    if (newCount >= 6) {
      setLogoClicks(0);
      navigate('/admin/login');
    } else {
      setLogoClicks(newCount);
      clickTimerRef.current = setTimeout(() => {
        setLogoClicks(0);
      }, 5000);
    }
  };

  const siteSettings = useSiteSettings();

  const contactPhone = siteSettings?.phone1 || "0331-3141853 (Tanveer)";
  const contactPhone2 = siteSettings?.phone2 || "0315-2227331";
  const contactAddress = "M.A Jinnah Road, Gulshan-e-Ahoor, Numaish, Karachi.";
  const contactAddress2 = "H.12, St-8, Qasba Colony, Muslimabad No. 2, SITE, Karachi.";
  const contactEmail = "muhammad.adnan2625@yahoo.com";
  const contactEmail2 = siteSettings?.adminEmail || "ahmed786awan@gmail.com";
  const authorizations = ["Tanveer Ahmed & Co.", "KMC Verified Vendor", "PEC Registered Contractor"];

  return (
    <div className="min-h-screen selection:bg-yellow-500 selection:text-black bg-[#050505]">
      
      {/* Global Header */}
      <header className="sticky top-0 w-full z-[100] bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_40px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-6 max-w-[1600px] h-20 flex items-center justify-between relative">
          
          <div className="flex items-center gap-4 shrink-0 mr-4 lg:mr-10">
            <Link to="/" className="flex flex-col justify-center no-underline hover:opacity-90">
              <BrandLogo onClick={handleLogoClick} className="scale-90 lg:scale-100 origin-left" />
            </Link>
            
            <div className="hidden md:flex items-center text-yellow-500 ml-4">
              <span className="font-black text-xl tracking-[0.2em] uppercase font-outfit">DECENT DISPOSAL</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center flex-1 gap-6 2xl:gap-10 px-4 justify-center text-gray-300">
            <Link to="/" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">Home</Link>
            <Link to="/process" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">Our Process</Link>
            <Link to="/portfolio" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">Portfolio</Link>
            <Link to="/about-company" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">About</Link>
            <Link to="/scrap-rates" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">Scrap Rates</Link>
            <Link to="/blog" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[13px] 2xl:text-[14px] font-bold whitespace-nowrap">Blog</Link>
          </nav>

          <div className="flex items-center justify-end gap-3 shrink-0">
             <Link to="/quote" className="hidden lg:flex px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all uppercase tracking-widest text-[10px] font-bold text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.1)] whitespace-nowrap">Contact Us</Link>
            
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-[#111111] border border-white/10 rounded-full flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all text-xs text-white shadow-inner group"
            >
              <span className={cn("opacity-50 group-hover:opacity-100 transition-opacity", !isUrdu && "font-bold text-yellow-400 opacity-100")}>EN</span>
              <span className="h-3 w-[1px] bg-white/20"></span>
              <span className={cn("urdu-text opacity-50 group-hover:opacity-100 transition-opacity", isUrdu && "font-bold text-yellow-400 opacity-100")}>اردو</span>
            </button>

            <button className="xl:hidden text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-[#050505] border-t border-white/10 p-6 flex flex-col gap-6 animate-fade-in text-center absolute w-full left-0">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">Home</Link>
            <Link to="/process" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">Our Process</Link>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">Portfolio</Link>
            <Link to="/about-company" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">About Company</Link>
            <Link to="/scrap-rates" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">Scrap Rates</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-sm">Blog</Link>
            <Link to="/quote" onClick={() => setIsMenuOpen(false)} className="text-yellow-500 font-bold uppercase tracking-widest text-sm">Contact Us</Link>
          </div>
        )}
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about-company" element={<AboutCompany />} />
        <Route path="/scrap-rates" element={<ScrapRatesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
      </Routes>

      <footer className="bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        {/* Decorative Grid and Glows */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 text-sm text-gray-500 font-poppins">
            
            {/* Branding Column */}
            <div className={cn("space-y-6 md:col-span-5 lg:col-span-4", isUrdu ? "md:text-right md:flex md:flex-col md:items-end md:justify-start" : "text-left")}>
              <div className={cn("flex flex-col items-start gap-2", isUrdu && "items-end")}>
                <BrandLogo className="scale-[0.8] origin-left" />
                <span className="text-yellow-500 font-bold uppercase tracking-[0.2em] text-[8px] mt-1 ml-1">Premium Operations</span>
              </div>
              <p className={cn("max-w-sm text-gray-400 leading-relaxed", isUrdu && "urdu-text text-base leading-loose ml-auto")}>
                {isUrdu 
                  ? "کراچی میں لگژری رینوویشن اور سکریپ مینجمنٹ میں 10 سال سے زیادہ کا تجربہ۔ ہم صرف رینوویشن نہیں کرتے، ہم آپ کے کام کی جگہ کو شاہکار بناتے ہیں۔"
                  : "Certified specialists in premium industrial scrap and corporate liquidation services across Pakistan. De-cluttering your space while maximizing asset value."
                }
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social icons could go here */}
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Offices Column */}
            <div className={cn("space-y-8 md:col-span-7 lg:col-span-6", isUrdu && "md:text-right")}>
              <div className={cn("flex items-center gap-3 mb-6", isUrdu && "justify-end")}>
                <div className="h-px w-8 bg-yellow-500/50"></div>
                <div className="text-white font-bold uppercase tracking-[0.3em] text-[10px]">Corporate Offices</div>
                <div className="h-px w-8 bg-yellow-500/50"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                
                {/* Primary Contact */}
                <div className={cn("bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors shadow-xl", isUrdu && "text-right")}>
                   <div className={cn("text-yellow-500 font-black uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2", isUrdu && "justify-end")}>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                      Primary Headquarters
                   </div>
                   
                   <div className="space-y-4 text-xs font-medium text-gray-300">
                     <div className={cn("flex items-start gap-4 hover:text-white transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10">
                          <Phone className="w-3.5 h-3.5 text-yellow-500" />
                        </div>
                        <span className="mt-1.5 tracking-wider">{contactPhone}</span>
                     </div>

                     <div className={cn("flex items-start gap-4 hover:text-white transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10">
                          <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                        </div>
                        <span className="mt-1 leading-relaxed max-w-[200px]">{contactAddress}</span>
                     </div>
                     
                     <div className={cn("flex items-start gap-4 hover:text-white transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/10">
                          <Globe className="w-3.5 h-3.5 text-yellow-500" />
                        </div>
                        <span className="mt-1.5 break-all max-w-[200px]">{contactEmail}</span>
                     </div>
                   </div>
                </div>

                {/* Secondary Contact */}
                <div className={cn("bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors shadow-xl", isUrdu && "text-right")}>
                   <div className={cn("text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2", isUrdu && "justify-end")}>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                      Secondary Office
                   </div>
                   
                   <div className="space-y-4 text-xs font-medium text-gray-400">
                     <div className={cn("flex items-start gap-4 hover:text-gray-300 transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-3.5 h-3.5 opacity-60" />
                        </div>
                        <span className="mt-1.5 tracking-wider">{contactPhone2}</span>
                     </div>

                     <div className={cn("flex items-start gap-4 hover:text-gray-300 transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-3.5 h-3.5 opacity-60" />
                        </div>
                        <span className="mt-1 leading-relaxed max-w-[200px]">{contactAddress2}</span>
                     </div>
                     
                     <div className={cn("flex items-start gap-4 hover:text-gray-300 transition-colors group", isUrdu && "flex-row-reverse")}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Globe className="w-3.5 h-3.5 opacity-60" />
                        </div>
                        <span className="mt-1.5 break-all max-w-[200px]">{contactEmail2}</span>
                     </div>
                   </div>
                </div>

              </div>
            </div>

            {/* Authorization Column */}
            <div className={cn("space-y-6 md:col-span-12 lg:col-span-2 pt-8 lg:pt-0 border-t border-white/5 lg:border-t-0 lg:border-l lg:pl-12", isUrdu && "lg:text-right")}>
              <div className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Authorizations</div>
              <ul className="space-y-4">
                {authorizations.map((auth: string, idx: number) => (
                  <li key={idx} className={cn("text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-3", isUrdu && "flex-row-reverse")}>
                    <div className="w-2 h-0.5 bg-yellow-500/50"></div>
                    {auth}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-white/5 bg-black/40">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
              © {new Date().getFullYear()} Decent Disposal. Built with precision and trust.
            </div>
            <div className="flex items-center gap-6 text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <Link to="/sitemap" className="hover:text-yellow-400 transition-colors underline decoration-white/10 underline-offset-4">Sitemap (HTML)</Link>
              <Link to="/about-company" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link to="/about-company" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteSettingsProvider>
        <ScrollToTop />
        <MainLayout />
      </SiteSettingsProvider>
    </BrowserRouter>
  );
}

