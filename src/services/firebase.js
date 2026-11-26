import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  writeBatch
} from 'firebase/firestore';

export const firebaseConfig = {
  projectId: "srimaanquotationgen",
  appId: "1:345034889780:web:e3cbcc55418974d1d58861",
  storageBucket: "srimaanquotationgen.firebasestorage.app",
  apiKey: "AIzaSyBZB5TS80ze-ekTIpt2hTLavrY0WgKNW9Y",
  authDomain: "srimaanquotationgen.firebaseapp.com",
  messagingSenderId: "345034889780",
  measurementId: "G-8ESGEZ2PL4"
};

// Initialize Firebase safely (prevent re-initialization during HMR)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper to remove any undefined fields before sending to Firestore
const sanitizeData = (data) => {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    return value === undefined ? null : value;
  }));
};

/**
 * Subscribe to real-time updates for all quotations
 * @param {Function} onUpdate - callback when quotations change
 * @param {Function} onError - callback when error occurs
 * @returns {Function} unsubscribe function
 */
export const subscribeQuotations = (onUpdate, onError) => {
  try {
    const qCol = collection(db, 'quotations');
    return onSnapshot(
      qCol,
      (snapshot) => {
        const quotes = [];
        snapshot.forEach((docSnap) => {
          quotes.push({ ...docSnap.data(), id: docSnap.id });
        });
        // Sort newest first by date or id
        quotes.sort((a, b) => {
          const dateA = new Date(a.date || a.updatedAt || 0).getTime();
          const dateB = new Date(b.date || b.updatedAt || 0).getTime();
          return dateB - dateA;
        });
        onUpdate(quotes);
      },
      (error) => {
        console.warn('Firestore quotations listener error (falling back to local cache):', error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Failed to subscribe to quotations:', error);
    if (onError) onError(error);
    return () => {};
  }
};

/**
 * Save or update a single quotation in Cloud Firestore
 */
export const saveQuotationToCloud = async (quotation) => {
  if (!quotation || !quotation.id) return;
  try {
    const sanitized = sanitizeData({
      ...quotation,
      updatedAt: new Date().toISOString()
    });
    const docRef = doc(db, 'quotations', String(quotation.id));
    await setDoc(docRef, sanitized, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error saving quotation to Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Delete a quotation from Cloud Firestore
 */
export const deleteQuotationFromCloud = async (quotationId) => {
  if (!quotationId) return;
  try {
    const docRef = doc(db, 'quotations', String(quotationId));
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting quotation from Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Save master company and bank settings to Cloud Firestore
 */
export const saveSettingsToCloud = async (settings) => {
  try {
    const sanitized = sanitizeData({
      ...settings,
      updatedAt: new Date().toISOString()
    });
    const docRef = doc(db, 'settings', 'master');
    await setDoc(docRef, sanitized, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error saving settings to Firestore:', error);
    return { success: false, error };
  }
};

/**
 * Subscribe to real-time updates for master settings
 */
export const subscribeSettings = (onUpdate, onError) => {
  try {
    const docRef = doc(db, 'settings', 'master');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onUpdate(docSnap.data());
        }
      },
      (error) => {
        console.warn('Firestore settings listener error:', error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.warn('Failed to subscribe to settings:', error);
    if (onError) onError(error);
    return () => {};
  }
};

/**
 * Initial seed: If Firestore is empty, populate initial starter quotations
 */
export const seedInitialQuotationsIfEmpty = async (initialQuotes = []) => {
  try {
    const qCol = collection(db, 'quotations');
    const snapshot = await getDocs(qCol);
    if (snapshot.empty && initialQuotes.length > 0) {
      console.log('Seeding initial quotations to Cloud Firestore...');
      const batch = writeBatch(db);
      initialQuotes.forEach(quote => {
        const docRef = doc(db, 'quotations', String(quote.id));
        batch.set(docRef, sanitizeData({
          ...quote,
          updatedAt: new Date().toISOString()
        }));
      });
      await batch.commit();
      console.log('Initial quotations successfully seeded to Cloud Firestore!');
    }
  } catch (error) {
    console.warn('Could not check or seed Firestore quotations:', error);
  }
};
