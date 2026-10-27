/**
 * Persistent Storage Manager for NO BROKER Real Estate Portal
 * Uses IndexedDB as primary high-capacity storage for base64 uploaded property images
 * with LocalStorage fallback and automatic QuotaExceeded error handling.
 */

import { Property, UserProfile } from '../types';

const DB_NAME = 'nobroker_app_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';

/**
 * Initializes or retrieves IndexedDB instance
 */
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

/**
 * Saves a key-value pair to IndexedDB
 */
export const setIDBItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to LocalStorage:', err);
  }
};

/**
 * Retrieves a key-value pair from IndexedDB
 */
export const getIDBItem = async <T>(key: string): Promise<T | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve((request.result as T) || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('IndexedDB read failed:', err);
    return null;
  }
};

/**
 * Persists properties state across reloads in both IndexedDB and LocalStorage safely
 */
export const savePropertiesToStorage = async (properties: Property[]): Promise<void> => {
  // 1. Always save to IndexedDB (unlimited capacity for high-res uploaded images)
  await setIDBItem('nobroker_properties', properties);

  // 2. Save compressed copy to LocalStorage (catching QuotaExceededError if present)
  try {
    localStorage.setItem('nobroker_properties', JSON.stringify(properties));
  } catch (err) {
    console.warn('LocalStorage full when saving properties, indexedDB handles full persistence:', err);
  }
};

/**
 * Loads persisted properties state on app launch from IndexedDB or LocalStorage
 */
export const loadPropertiesFromStorage = async (): Promise<Property[] | null> => {
  // Try IndexedDB first
  const idbData = await getIDBItem<Property[]>('nobroker_properties');
  if (idbData && Array.isArray(idbData) && idbData.length > 0) {
    return idbData;
  }

  // Fallback to LocalStorage
  const lsData = localStorage.getItem('nobroker_properties');
  if (lsData) {
    try {
      const parsed = JSON.parse(lsData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // return null
    }
  }

  return null;
};

/**
 * Persists user profile state across reloads
 */
export const saveUserToStorage = async (user: UserProfile): Promise<void> => {
  await setIDBItem('nobroker_user', user);
  try {
    localStorage.setItem('nobroker_user', JSON.stringify(user));
  } catch (err) {
    console.warn('LocalStorage save user failed:', err);
  }
};

/**
 * Loads persisted user profile state on app launch
 */
export const loadUserFromStorage = async (): Promise<UserProfile | null> => {
  const idbUser = await getIDBItem<UserProfile>('nobroker_user');
  if (idbUser && idbUser.savedPropertyIds) {
    return idbUser;
  }

  const lsUser = localStorage.getItem('nobroker_user');
  if (lsUser) {
    try {
      return JSON.parse(lsUser);
    } catch {
      return null;
    }
  }

  return null;
};
