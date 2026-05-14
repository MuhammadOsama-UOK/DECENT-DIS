import { db, handleFirestoreError } from './firebase';
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
import { Auth } from 'firebase/auth';

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
  const path = "scrap_rates";
  const q = query(collection(db, path), orderBy("category", "asc"));
  return onSnapshot(q, (snapshot) => {
    const rates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ScrapRate));
    callback(rates);
  }, (error) => {
    console.error("Rates subscription error detail:", error);
    handleFirestoreError(error, 'list', path).catch(() => {});
    callback([]);
  });
};

export const editMaterial = async (id: string, updatedData: any) => {
  const path = `scrap_rates/${id}`;
  const docRef = doc(db, "scrap_rates", id);
  try {
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error("Material not found");
    
    const currentData = snap.data();
    await updateDoc(docRef, { 
      ...updatedData,
      previous_price: updatedData.price !== currentData.price ? currentData.price || 0 : currentData.previous_price,
      lastUpdated: new Date().toISOString() 
    });
  } catch (error) {
    await handleFirestoreError(error, 'update', path);
  }
};

export const addNewMaterial = async (material: any) => {
  const path = "scrap_rates";
  try {
    return await addDoc(collection(db, path), {
      ...material,
      previous_price: material.price || 0,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    await handleFirestoreError(error, 'create', path);
  }
};

export const deleteMaterial = async (id: string) => {
  const path = `scrap_rates/${id}`;
  try {
    return await deleteDoc(doc(db, "scrap_rates", id));
  } catch (error) {
    await handleFirestoreError(error, 'delete', path);
  }
};

// --- 2. LEADS CRM LOGIC ---
export const subscribeToLeads = (callback: (data: any[]) => void) => {
  const path = "leads";
  const q = query(collection(db, path), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(leads);
  }, (error) => {
    handleFirestoreError(error, 'list', path).catch(() => {});
  });
};

export const createLead = async (leadData: any) => {
  const path = "leads";
  try {
    return await addDoc(collection(db, path), {
      ...leadData,
      timestamp: Timestamp.now(),
      status: 'new'
    });
  } catch (error) {
    await handleFirestoreError(error, 'create', path);
  }
};

// --- 3. SITE SETTINGS LOGIC ---
export const subscribeToSettings = (callback: (data: any) => void) => {
  const path = "site_settings/contact_info";
  return onSnapshot(doc(db, "site_settings", "contact_info"), (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  }, (error) => {
    console.error("SiteSettings subscription error detail:", error);
    handleFirestoreError(error, 'get', path).catch(() => {});
  });
};

export const updateSettings = async (settings: any) => {
  const path = "site_settings/contact_info";
  try {
    const docRef = doc(db, "site_settings", "contact_info");
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    await handleFirestoreError(error, 'update', path);
  }
};
