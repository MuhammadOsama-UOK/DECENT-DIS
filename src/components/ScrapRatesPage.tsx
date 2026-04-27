import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, TrendingUp, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

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
      setError('Failed to load rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tight text-white">Live Scrap Rates</h2>
          <button onClick={fetchRates} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white">
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
          </button>
        </div>

        {loading && rates.length === 0 ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="animate-spin w-12 h-12 text-yellow-500" />
          </div>
        ) : error ? (
            <div className="text-red-500 text-center py-24 font-bold">{error}</div>
        ) : (
          <div className="bg-[#080808] rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-white/5 uppercase text-[10px] font-black tracking-widest text-slate-400">
                <tr>
                  <th className="p-6">Material</th>
                  <th className="p-6">Rate</th>
                  <th className="p-6">Change</th>
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
                    <td className={cn("p-6 font-bold", rate.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')}>
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
