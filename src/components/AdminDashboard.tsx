import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Save,
  MessageCircle,
  Plus,
  Trash2,
  Loader2,
  Menu,
  Phone,
  Mail,
  Zap,
  Edit2,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { auth } from '@/src/lib/firebase';
import { 
  subscribeToRates, 
  editMaterial, 
  addNewMaterial, 
  deleteMaterial,
  subscribeToLeads,
  subscribeToSettings,
  updateSettings
} from '@/src/lib/db';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type TabType = 'leads' | 'rates' | 'settings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [user, setUser] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Firestore Data States
  const [rates, setRates] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoadingAuth(false);
      if (!user) navigate('/admin/login');
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const unsubRates = subscribeToRates(setRates);
    const unsubLeads = subscribeToLeads(setLeads);
    const unsubSettings = subscribeToSettings(setSiteSettings);

    return () => {
      unsubRates();
      unsubLeads();
      unsubSettings();
    };
  }, [user]);

  const categories = ['Prime Metals', 'Iron & Steel', 'Energy/Battery', 'E-Waste', 'Corporate/Machinery', 'Paper/Plastic', 'Others'];

  const handleLogout = async () => {
    await auth?.signOut();
    navigate('/admin/login');
  };

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const NavContent = () => (
    <>
      <div className="flex items-center gap-4 mb-10 px-2 lg:px-0">
        <div className="w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center font-black text-black italic text-xl shadow-lg shadow-[#22C55E]/20">D</div>
        <div>
          <h2 className="font-outfit font-black text-lg tracking-tighter leading-none text-white">CONSOLE</h2>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-none">Management</span>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        <NavBtn active={activeTab === 'leads'} onClick={() => { setActiveTab('leads'); setIsSidebarOpen(false); }} icon={<LayoutDashboard className="w-5 h-5" />} label="Lead CRM" subtitle="Customer Inquiries" />
        <NavBtn active={activeTab === 'rates'} onClick={() => { setActiveTab('rates'); setIsSidebarOpen(false); }} icon={<BarChart3 className="w-5 h-5" />} label="Market Manager" subtitle="Live Rates Control" />
        <NavBtn active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} icon={<Settings className="w-5 h-5" />} label="Contact Info" subtitle="Global Settings" />
      </nav>

      <div className="mt-auto pt-10">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-zinc-600 hover:text-red-400 transition-colors text-sm font-bold py-3">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex text-white font-poppins overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 w-full bg-black border-b border-white/5 p-4 flex items-center justify-between z-[210]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center font-black text-black italic text-sm">D</div>
          <span className="font-black text-xs tracking-widest uppercase text-white">Console</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg active:scale-95 transition-all text-white">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:flex w-72 border-r border-white/5 p-8 flex-col bg-black/40 backdrop-blur-3xl shrink-0">
        <NavContent />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-[220] p-8 flex flex-col pt-20">
             <NavContent />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 pt-24 lg:pt-16 relative">
         <AnimatePresence mode="wait">
            {activeTab === 'leads' && <LeadsTab leads={leads} />}
            {activeTab === 'rates' && <RatesTab rates={rates} categories={categories} />}
            {activeTab === 'settings' && <SettingsTab settings={siteSettings} />}
         </AnimatePresence>
      </main>
    </div>
  );
}

// --- TAB 1: LEAD CRM ---
function LeadsTab({ leads }: { leads: any[] }) {
  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi ${name}, this is Decent Disposal. We received your scrap inquiry.`);
    window.open(`https://wa.me/${cleanPhone.startsWith('0') ? '92' + cleanPhone.substring(1) : cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Lead <span className="text-yellow-500">CRM</span></h1>
        <p className="text-zinc-500 mt-2 font-medium">Manage all incoming web inquiries from the contact form.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden overflow-x-auto shadow-2xl">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-white/[0.03] border-b border-white/5">
            <tr>
              <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Received At</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Customer Identity</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Service Category</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.015] transition-colors group">
                <td className="p-8 font-mono text-xs text-zinc-400">
                  {lead.timestamp ? new Date(lead.timestamp.seconds * 1000).toLocaleString() : 'Just Now'}
                </td>
                <td className="p-8">
                  <p className="font-bold text-white mb-1">{lead.fullName}</p>
                  <p className="font-mono text-xs text-yellow-500/80">{lead.phone}</p>
                </td>
                <td className="p-8">
                  <span className="text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest border border-white/10 bg-white/5 text-zinc-300">
                    {lead.service || lead.type || 'General'}
                  </span>
                </td>
                <td className="p-8">
                  <button 
                    onClick={() => handleWhatsApp(lead.phone, lead.fullName)} 
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#25D366]/10"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <div className="py-24 text-center">
            <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-zinc-800" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">No active leads found in CRM</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- TAB 2: SCRAP RATE MANAGER ---
function RatesTab({ rates, categories }: { rates: any[], categories: string[] }) {
  const [newRate, setNewRate] = useState({ 
    label_en: '', 
    label_ur: '', 
    price: 0, 
    unit: 'kg', 
    category: 'Prime Metals'
  });
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit state
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRate.label_en || !newRate.label_ur) {
      toast.error("Please fill both names");
      return;
    }
    const loading = toast.loading('Adding material...');
    try {
      await addNewMaterial(newRate);
      toast.dismiss(loading);
      toast.success('Successfully added');
      setNewRate({ ...newRate, label_en: '', label_ur: '', price: 0 });
    } catch (e) {
      toast.dismiss(loading);
      toast.error('Operation failed');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const loading = toast.loading('Updating Market Asset...');
    try {
      await editMaterial(editingItem.id, {
        label_en: editingItem.label_en,
        label_ur: editingItem.label_ur,
        price: Number(editingItem.price),
        unit: editingItem.unit,
        category: editingItem.category
      });
      toast.dismiss(loading);
      toast.success('Updated live on Website');
      setEditingItem(null);
    } catch (e) {
      toast.dismiss(loading);
      toast.error('Update failed');
    }
  };

  const filteredRates = rates.filter(r => {
    const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
    const label_en = r.label_en || '';
    const label_ur = r.label_ur || '';
    const matchesSearch = label_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          label_ur.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Market <span className="text-[#22C55E]">Board</span></h1>
          <p className="text-zinc-600 mt-2 font-medium">Control live scrap prices displayed on the Home Ticker and Rates page.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-zinc-900 p-2 rounded-2xl border border-white/5 shadow-xl">
           <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-xl border border-white/5 focus-within:border-[#22C55E]/50 transition-all">
              <span className="text-zinc-600">Search</span>
              <input 
                type="text" 
                placeholder="English or Roman Urdu..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-[#22C55E] placeholder:text-zinc-800 w-48"
              />
           </div>
           <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
           <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-4">Segment:</span>
           <select 
             value={filterCategory} 
             onChange={e => setFilterCategory(e.target.value)}
             className="bg-black/40 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-0 text-[#22C55E]"
           >
             <option value="All">All Segments</option>
             {categories.map(c => <option key={c} value={c}>{c}</option>)}
           </select>
           
           <button 
             onClick={async () => {
               if(!confirm('Seed database with original Karachi Scrap Market data? This will add dozens of items.')) return;
               const seedData = [
                 { label_en: 'Copper (Pure Tamba)', label_ur: 'پیور تانبا', price: 2180, unit: 'kg', category: 'Prime Metals' },
                 { label_en: 'Brass (Peetal)', label_ur: 'پیتل', price: 1150, unit: 'kg', category: 'Prime Metals' },
                 { label_en: 'Aluminium (Soft)', label_ur: 'نرم ایلومینیم', price: 540, unit: 'kg', category: 'Prime Metals' },
                 { label_en: 'Iron (Steel Scrap)', label_ur: 'سٹیل لوہا', price: 215, unit: 'kg', category: 'Iron & Steel' },
                 { label_en: 'Lead (Shisha)', label_ur: 'شیشہ (لیڈ)', price: 480, unit: 'kg', category: 'Others' },
                 { label_en: 'Battery (Dry)', label_ur: 'ڈرائی بیٹری', price: 240, unit: 'kg', category: 'Energy/Battery' },
                 { label_en: 'Battery (Liquid/Acid)', label_ur: 'تیزاب والی بیٹری', price: 290, unit: 'kg', category: 'Energy/Battery' },
                 { label_en: 'UPS (Running Condition)', label_ur: 'یو پی ایس چالو', price: 3500, unit: 'unit', category: 'Energy/Battery' },
                 { label_en: 'PC Motherboard', label_ur: 'پی سی مدر بورڈ', price: 850, unit: 'unit', category: 'E-Waste' },
                 { label_en: 'RAM / Mixed Cards', label_ur: 'ریم / کارڈز', price: 1200, unit: 'kg', category: 'E-Waste' },
                 { label_en: 'Mix Electronic Cards', label_ur: 'مکس الیکٹرانک کارڈز', price: 450, unit: 'kg', category: 'E-Waste' },
                 { label_en: 'Hard Disk (Mixed)', label_ur: 'ہارڈ ڈسک', price: 150, unit: 'unit', category: 'E-Waste' },
                 { label_en: 'AC (1 Ton Split)', label_ur: 'اے سی ون ٹن', price: 15000, unit: 'unit', category: 'Corporate/Machinery' },
                 { label_en: 'AC (1.5 Ton Split)', label_ur: 'اے سی ڈیڑھ ٹن', price: 22000, unit: 'unit', category: 'Corporate/Machinery' },
                 { label_en: 'Generator (Small 2KVA)', label_ur: 'چھوٹا جنریٹر', price: 8000, unit: 'unit', category: 'Corporate/Machinery' },
                 { label_en: 'Mix Office Paper', label_ur: 'مکس دفتری کاغذ', price: 65, unit: 'kg', category: 'Paper/Plastic' },
                 { label_en: 'Cardboard (Gatta)', label_ur: 'گتہ', price: 45, unit: 'kg', category: 'Paper/Plastic' },
                 { label_en: 'Plastic (Batti)', label_ur: 'پلاسٹک بٹی', price: 110, unit: 'kg', category: 'Paper/Plastic' },
                 { label_en: 'Solar Panel (Old/Broken)', label_ur: 'سولر پینل پرانا', price: 35, unit: 'watt', category: 'Energy/Battery' }
               ];
               
               const loading = toast.loading('Seeding data...');
               try {
                 await Promise.all(seedData.map(material => addNewMaterial(material)));
                 toast.dismiss(loading);
                 toast.success('Market seeded successfully!');
               } catch (e) {
                 toast.dismiss(loading);
                 toast.error('Seed failed');
               }
             }}
             className="px-4 py-2 bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
           >
             Seed Karachi Data
           </button>
        </div>
      </div>

      {/* 1. ADD FORM */}
      <div className="bg-zinc-900 border border-white/10 rounded-[40px] p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#22C55E]"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#22C55E] mb-10 flex items-center gap-3">
          <Plus className="w-5 h-5" /> Register New Market Commodity
        </h2>
        
        <form onSubmit={handleAddNew} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-end">
          <div className="lg:col-span-1.5 flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">English Title</span>
            <input type="text" placeholder="e.g. Copper Pure" value={newRate.label_en} onChange={v => setNewRate({...newRate, label_en: v.target.value})} className="bg-black border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-[#22C55E] outline-none transition-all font-bold text-white shadow-inner" />
          </div>
          <div className="lg:col-span-1.5 flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Urdu Title</span>
            <input type="text" placeholder="پیور تانبا" value={newRate.label_ur} onChange={v => setNewRate({...newRate, label_ur: v.target.value})} className="bg-black border border-white/5 rounded-xl px-5 py-3 urdu-text text-2xl text-right text-white focus:border-[#22C55E] outline-none transition-all shadow-inner" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Base Price</span>
            <input type="number" value={newRate.price} onChange={v => setNewRate({...newRate, price: Number(v.target.value)})} className="bg-black border border-white/5 rounded-xl px-5 py-4 text-sm font-mono text-[#22C55E] font-black focus:border-[#22C55E] outline-none shadow-inner" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Unit</span>
            <select value={newRate.unit} onChange={v => setNewRate({...newRate, unit: v.target.value})} className="bg-black border border-white/5 rounded-xl px-4 h-[54px] text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#22C55E] appearance-none text-white shadow-inner">
              <option value="kg">PKR / KG</option>
              <option value="unit">PKR / Unit</option>
              <option value="ton">PKR / Ton</option>
              <option value="watt">PKR / Watt</option>
            </select>
          </div>
           <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1 text-zinc-500">Sector</span>
            <select value={newRate.category} onChange={v => setNewRate({...newRate, category: v.target.value })} className="bg-black border border-white/5 rounded-xl px-4 h-[54px] text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#22C55E] appearance-none text-white shadow-inner">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="h-[54px] bg-[#22C55E] text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#22C55E]/10 active:scale-95">Add Live</button>
        </form>
      </div>

      {/* 2. MANAGEMENT LIST */}
      <div className="bg-zinc-900 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[950px]">
             <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-700">Material Identity</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-700">Live Price (PKR)</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRates.map((rate) => (
                <tr key={rate.id} className="hover:bg-white/[0.015] transition-colors group text-white">
                  <td className="p-8">
                     <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-[#22C55E] border border-white/10 shrink-0">
                           {rate.category}
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg tracking-tight mb-1">{rate.label_en}</p>
                          <p className="text-2xl urdu-text text-[#22C55E] leading-none">{rate.label_ur}</p>
                        </div>
                     </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl text-white font-black">{rate.price?.toLocaleString() || 0}</span>
                      <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-none">/ {rate.unit}</span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => setEditingItem(rate)} className="p-4 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
                         <Edit2 className="w-5 h-5" />
                       </button>
                       <button onClick={() => { if(confirm('Delete permanently?')) deleteMaterial(rate.id); }} className="p-4 bg-red-500/5 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-zinc-900 border border-white/10 w-full max-w-xl flex flex-col rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 border-b border-white/5 bg-black/30">
                <h3 className="text-lg font-black uppercase tracking-widest text-white">Edit Asset</h3>
                <button onClick={() => setEditingItem(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-8 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">English Title</span>
                    <input type="text" required value={editingItem.label_en} onChange={e => setEditingItem({...editingItem, label_en: e.target.value})} className="bg-black border border-white/5 rounded-xl px-5 py-4 text-sm focus:border-[#22C55E] outline-none transition-all font-bold text-white shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Urdu Title</span>
                    <input type="text" dir="rtl" required value={editingItem.label_ur} onChange={e => setEditingItem({...editingItem, label_ur: e.target.value})} className="bg-black border border-white/5 rounded-xl px-5 py-3 urdu-text text-2xl text-right text-white focus:border-[#22C55E] outline-none transition-all shadow-inner" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2 col-span-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Price (PKR)</span>
                    <input type="number" required value={editingItem.price === '' ? '' : editingItem.price} onChange={e => setEditingItem({...editingItem, price: e.target.value})} className="bg-black border border-white/5 rounded-xl px-5 py-4 text-sm font-mono text-[#22C55E] font-black focus:border-[#22C55E] outline-none shadow-inner" />
                  </div>
                  <div className="flex flex-col gap-2 col-span-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Unit</span>
                    <select required value={editingItem.unit} onChange={e => setEditingItem({...editingItem, unit: e.target.value})} className="bg-black border border-white/5 rounded-xl px-4 h-[54px] text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#22C55E] appearance-none text-white shadow-inner">
                      <option value="kg">PKR / KG</option>
                      <option value="unit">PKR / Unit</option>
                      <option value="ton">PKR / Ton</option>
                      <option value="watt">PKR / Watt</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 col-span-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 ml-1">Category</span>
                    <select required value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="bg-black border border-white/5 rounded-xl px-4 h-[54px] text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#22C55E] appearance-none text-white shadow-inner">
                       {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="mt-4 h-[54px] bg-[#22C55E] text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#22C55E]/10 active:scale-95">
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- TAB 3: CONTACT SETTINGS ---
function SettingsTab({ settings }: { settings: any }) {
  const [draft, setDraft] = useState({ adminEmail: '', phone1: '', phone2: '' });

  useEffect(() => {
    if (settings) setDraft({ ...settings });
  }, [settings]);

  const handleSave = async () => {
    const loading = toast.loading('Synchronizing Settings...');
    try {
      await updateSettings(draft);
      toast.dismiss(loading);
      toast.success('Global Contact Info Updated');
    } catch (e) {
      toast.dismiss(loading);
      toast.error('Sync failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white text-dark-bg">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Contact <span className="text-[#22C55E]">Config</span></h1>
          <p className="text-zinc-600 mt-2 font-medium">Control common company identifiers across the whole website.</p>
        </div>
        <button onClick={handleSave} className="bg-[#22C55E] text-black font-black px-12 py-5 rounded-xl flex items-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#22C55E]/20 active:scale-95 uppercase tracking-widest text-[11px]">
          <Save className="w-5 h-5" /> Sync Global Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[40px] space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#22C55E]/10 rounded-2xl text-[#22C55E] leading-none shadow-inner"><Phone className="w-6 h-6" /></div>
            <h3 className="font-black uppercase tracking-[0.2em] text-sm text-white">Phone Line Management</h3>
          </div>
          <div className="space-y-6">
            <Input label="Main Office Phone" val={draft.phone1} set={v => setDraft({...draft, phone1: v})} />
            <Input label="Backup Lead Number" val={draft.phone2} set={v => setDraft({...draft, phone2: v})} />
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[40px] space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 leading-none shadow-inner"><Mail className="w-6 h-6" /></div>
            <h3 className="font-black uppercase tracking-[0.2em] text-sm text-white">Official Support Entry</h3>
          </div>
          <div className="space-y-6">
            <Input label="Site-wide Admin Email" val={draft.adminEmail} set={v => setDraft({...draft, adminEmail: v})} />
            <div className="p-8 bg-black/40 rounded-[28px] border border-white/5">
               <div className="flex items-center gap-3 text-[#22C55E] mb-3">
                  <Zap className="w-4 h-4 fill-current shadow-[0_0_10px_#22C55E]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Smart Sync Note</span>
               </div>
               <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">Changes made here are applied instantly to the Header, Footer, and Contact sections on the frontend. No developer intervention required.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// UI Components
function NavBtn({ active, onClick, icon, label, subtitle }: any) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-5 px-7 py-6 rounded-3xl transition-all group relative", active ? "bg-[#22C55E] text-black shadow-2xl shadow-[#22C55E]/20" : "text-zinc-600 hover:bg-white/5 hover:text-white")}>
      <div className={cn("transition-colors", active ? "text-black" : "text-zinc-700 group-hover:text-[#22C55E]")}>{icon}</div>
      <div className="text-left">
        <p className="font-black uppercase tracking-[0.1em] text-[12px] leading-tight mb-1">{label}</p>
        <p className={cn("text-[10px] font-medium leading-none", active ? "text-black/60" : "text-zinc-800")}>{subtitle}</p>
      </div>
    </button>
  );
}

function Input({ label, val, set, type = 'text' }: { label: string, val: string, set: (v: string) => void, type?: string }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 ml-1 block">{label}</label>
      <input type={type} value={val || ''} onChange={e => set(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[#22C55E] transition-all font-bold text-sm shadow-inner" />
    </div>
  );
}
