import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface SiteSettings {
  adminEmail: string;
  phone1: string;
  phone2: string;
}

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site_settings', 'contact_info'), (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as SiteSettings);
      }
    }, (error) => {
      console.error("SiteSettings listener failed:", error);
    });
    return () => unsub();
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  return context;
};
