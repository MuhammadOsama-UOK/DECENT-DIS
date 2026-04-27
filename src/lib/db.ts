import { db } from './firebase';
import { 
  collection, 
  doc, 
  updateDoc, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  getDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';

export interface ScrapRate {
  id: string;
  label_en: string;
  label_ur: string;
  price: number;
  previous_price?: number;
  unit: string;
  category: string;
  lastUpdated: string;
}

// --- 1. SCRAP RATES LOGIC ---
export const subscribeToRates = (callback: (data: ScrapRate[]) => void) => {
  const q = query(collection(db, "scrap_rates"), orderBy("category", "asc"));
  return onSnapshot(q, (snapshot) => {
    const rates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ScrapRate));
    callback(rates);
  }, (error) => {
    console.error("Rates subscription error detail:", {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    callback([]);
  });
};

export const editMaterial = async (id: string, updatedData: any) => {
  const docRef = doc(db, "scrap_rates", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Material not found");
  
  const currentData = snap.data();
  await updateDoc(docRef, { 
    ...updatedData,
    previous_price: updatedData.price !== currentData.price ? currentData.price || 0 : currentData.previous_price,
    lastUpdated: new Date().toISOString() 
  });
};

export const addNewMaterial = async (material: any) => {
  return await addDoc(collection(db, "scrap_rates"), {
    ...material,
    previous_price: material.price || 0,
    lastUpdated: new Date().toISOString()
  });
};

export const deleteMaterial = async (id: string) => {
  return await deleteDoc(doc(db, "scrap_rates", id));
};

// --- 2. LEADS CRM LOGIC ---
export const subscribeToLeads = (callback: (data: any[]) => void) => {
  const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(leads);
  });
};

export const createLead = async (leadData: any) => {
  return await addDoc(collection(db, "leads"), {
    ...leadData,
    timestamp: Timestamp.now(),
    status: 'new'
  });
};

// --- 3. SITE SETTINGS LOGIC ---
export const subscribeToSettings = (callback: (data: any) => void) => {
  return onSnapshot(doc(db, "site_settings", "contact_info"), (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  }, (error) => {
    console.error("SiteSettings subscription error detail:", {
      code: error.code,
      message: error.message,
      name: error.name
    });
  });
};

export const updateSettings = async (settings: any) => {
  const docRef = doc(db, "site_settings", "contact_info");
  await setDoc(docRef, settings, { merge: true });
};
