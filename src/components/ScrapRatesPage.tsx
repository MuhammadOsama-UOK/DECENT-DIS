import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, TrendingUp, RefreshCw, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

interface ScrapRate {
  material: string;
  rate: string;
  change: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1U0A-Ddrl9VdUTy2xHwb78h_5WZNahvdtn7dNx2st6Q4/gviz/tq?tqx=out:csv';

export default function ScrapRatesPage() {
  const [rates, setRates] = useState<ScrapRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isUrdu = i18n.language === 'ur';

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_URL);
      const data = await response.text();
      
      // Basic CSV parsing
      const rows = data.split('\n');
      const parsedRates: ScrapRate[] = rows.slice(1).map(row => {
        const [material, rate, change] = row.split(',').map(cell => cell.replace(/"/g, ''));
        return { material, rate, change };
      }).filter(r => r.material);

      setRates(parsedRates);
      setError(null);
    } catch (err) {
      setError(isUrdu ? 'ریٹس لوڈ کرنے میں ناکام۔ براہ کرم بعد میں کوشش کریں۔' : 'Failed to load rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, [isUrdu]);

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 md:px-12 relative">
      <SEO 
        title="Current Scrap Rates | Decent Disposal"
        description="Check the latest daily scrap rates for various materials including iron, steel, copper, and more in Pakistan."
        url="https://decentdisposal.pk/scrap-rates"
      />
      <motion.button 
        whileHover={{ scale: 1.1, x: isUrdu ? 4 : -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
        className={cn(
          "fixed top-24 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20 backdrop-blur-md transition-all shadow-md flex items-center justify-center",
          isUrdu ? "right-4 md:right-8" : "left-4 md:left-8"
        )}
      >
        <ArrowLeft className={cn("w-5 h-5", isUrdu && "rotate-180")} />
      </motion.button>
      <div className="max-w-4xl mx-auto">
        <div className={cn("flex justify-between items-center mb-12", isUrdu && "flex-row-reverse")}>
          <h2 className={cn("text-4xl font-black uppercase tracking-tight text-white", isUrdu && "urdu-text")}>
            {isUrdu ? "لائیو سکریپ ریٹس" : "Live Scrap Rates"}
          </h2>
          <button onClick={fetchRates} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
          </button>
        </div>

        {loading && rates.length === 0 ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="animate-spin w-12 h-12 text-yellow-500" />
          </div>
        ) : error ? (
            <div className={cn("text-red-500 text-center py-24 font-bold", isUrdu && "urdu-text")}>{error}</div>
        ) : (
          <div className="bg-[#080808] rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
            <table className={cn("w-full text-left", isUrdu && "text-right")} dir={isUrdu ? 'rtl' : 'ltr'}>
              <thead className="bg-white/5 uppercase text-[10px] font-black tracking-widest text-slate-400">
                <tr>
                  <th className={cn("p-6", isUrdu && "urdu-text text-sm")}>{isUrdu ? "مواد" : "Material"}</th>
                  <th className={cn("p-6", isUrdu && "urdu-text text-sm")}>{isUrdu ? "ریٹ" : "Rate"}</th>
                  <th className={cn("p-6", isUrdu && "urdu-text text-sm")}>{isUrdu ? "تبدیلی" : "Change"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rates.map((rate, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-6 font-bold text-white tracking-wide">{rate.material}</td>
                    <td className="p-6 font-mono text-yellow-500 font-bold">Rs. {rate.rate}</td>
                    <td className={cn("p-6 font-bold", rate.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')} dir="ltr">
                      {rate.change}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
