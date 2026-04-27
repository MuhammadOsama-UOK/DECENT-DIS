import { useTranslation } from 'react-i18next';
import './i18n';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import QuotePage from './components/QuotePage';
import ProcessPage from './components/ProcessPage';
import ScrapRatesPage from './components/ScrapRatesPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { Phone, MapPin, X, Menu, Globe } from 'lucide-react';
import { cn } from './lib/utils';
import { useState, useEffect, useRef } from 'react';
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

  const handleLogoClick = () => {
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

  const contactPhone = siteSettings?.phone1 || "0331 3141853";
  const contactPhone2 = siteSettings?.phone2 || "0310 2617722";
  const contactAddress = "H.12, St-8, Qasba Colony, Muslimabad No. 2, SITE, Karachi.";
  const contactEmail = siteSettings?.adminEmail || "ahmed786awan@gmail.com";
  const authorizations = ["Tanveer Ahmed & Co.", "KMC Verified Vendor", "PEC Registered Contractor"];

  return (
    <div className="min-h-screen selection:bg-[#64ffda] selection:text-black bg-white">
      
      {/* Global Header */}
      <header className="sticky top-0 w-full z-[100] bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div 
              onClick={handleLogoClick}
              className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center font-bold text-xl text-black cursor-pointer group-hover:scale-105 transition-transform select-none" 
            >
              DD
            </div>
            <Link to="/">
              <h1 className={cn("text-lg font-black tracking-tighter leading-none text-white font-outfit", isUrdu && "urdu-text leading-none")}>
                {isUrdu ? "ڈی سینٹ ڈسپوزل" : "DECENT DISPOSAL"}
              </h1>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold">
                {isUrdu ? "کراچی کی پریمیم سروسز" : "Karachi's Premier Services"}
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300 font-poppins">
              <Link to="/" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Home</Link>
              <Link to="/process" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Our Process</Link>
              <Link to="/portfolio" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Portfolio</Link>
              <Link to="/scrap-rates" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Scrap Rates</Link>
              <Link to="/quote" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Contact Us</Link>
            </nav>

            <button 
              onClick={toggleLanguage}
              className="px-3 md:px-4 py-2 border border-white/20 rounded-full flex items-center gap-2 hover:bg-white/5 transition-all text-xs md:text-sm text-white"
            >
              <span className={cn("opacity-60", !isUrdu && "font-bold opacity-100")}>EN</span>
              <span className="h-3 w.[1px] bg-white/20"></span>
              <span className={cn("urdu-text", isUrdu && "font-bold")}>اردو</span>
            </button>

            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black border-t border-white/10 p-6 flex flex-col gap-6 animate-fade-in text-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white font-bold uppercase tracking-widest text-sm">Home</Link>
            <Link to="/process" onClick={() => setIsMenuOpen(false)} className="text-white font-bold uppercase tracking-widest text-sm">Our Process</Link>
            <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-white font-bold uppercase tracking-widest text-sm">Portfolio</Link>
            <Link to="/scrap-rates" onClick={() => setIsMenuOpen(false)} className="text-white font-bold uppercase tracking-widest text-sm">Scrap Rates</Link>
            <Link to="/quote" onClick={() => setIsMenuOpen(false)} className="text-white font-bold uppercase tracking-widest text-sm">Contact Us</Link>
          </div>
        )}
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/scrap-rates" element={<ScrapRatesPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <footer className="bg-black py-20 border-t border-white/10 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500 font-poppins text-center md:text-left">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-sm text-black uppercase">DD</div>
              <span className="text-white font-black text-xl tracking-tighter">DECENT DISPOSAL</span>
            </div>
            <p className={cn("max-w-md mx-auto md:mx-0", isUrdu ? "urdu-text leading-relaxed text-base opacity-70" : "leading-relaxed")}>
              {isUrdu 
                ? "کراچی میں لگژری رینوویشن اور سکریپ مینجمنٹ میں 10 سال سے زیادہ کا تجربہ۔ ہم صرف رینوویشن نہیں کرتے، ہم آپ کے کام کی جگہ کو شاہکار بناتے ہیں۔"
                : "Premium renovation and industrial scrap management solutions for Karachi's corporate sector. De-cluttering your space while maximizing asset value."
              }
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-white font-bold uppercase tracking-widest text-[10px]">Headquarters</div>
            <div className="flex flex-col items-center md:items-start gap-3 text-xs">
              <div className="flex flex-col gap-1 items-center md:items-start">
                <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                   <Phone className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                   <span className="font-medium tracking-wider">{contactPhone}</span>
                </div>
                {contactPhone2 && (
                  <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group ml-7 md:ml-7">
                    <span className="font-medium tracking-wider">{contactPhone2}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                 <MapPin className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                 <span className="font-medium">{contactAddress}</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                 <Globe className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                 <span className="font-medium">{contactEmail}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-white font-bold uppercase tracking-widest text-[10px]">Authorization</div>
            {authorizations.map((auth: string, idx: number) => (
              <p key={idx} className="text-[10px] italic opacity-60">{auth}</p>
            ))}
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.4em] font-medium opacity-20">
          © {new Date().getFullYear()} Decent Disposal. Built with precision and trust.
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

