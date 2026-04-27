import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth } from '@/src/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in as Admin');
      navigate('/admin');
    } catch (error: any) {
      toast.error('Login Failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6 font-poppins">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[32px] shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl text-black">DD</div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Decent Disposal Management Console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@decentdisposal.pk"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-12 py-3 text-white outline-none focus:border-yellow-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-12 py-3 text-white outline-none focus:border-yellow-500 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processing...' : <><LogIn className="w-4 h-4" /> Sign In</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
