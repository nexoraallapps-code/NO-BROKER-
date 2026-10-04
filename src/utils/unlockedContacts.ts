const UNLOCKED_STORAGE_KEY = 'nobroker_unlocked_owner_contacts_v1';

/**
 * Retrieve the list of property IDs for which the user has unlocked owner contact details.
 */
export function getUnlockedContactIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(UNLOCKED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading unlocked contacts from storage', err);
    return [];
  }
}

/**
 * Checks whether the owner contact for a specific property has already been unlocked.
 */
export function isContactUnlocked(propertyId: string): boolean {
  if (!propertyId) return false;
  const ids = getUnlockedContactIds();
  return ids.includes(propertyId);
}

/**
 * Persists an unlocked property ID to localStorage so refreshing or navigating
 * preserves the unlocked state.
 */
export function persistUnlockedContact(propertyId: string): void {
  if (!propertyId || typeof window === 'undefined') return;
  try {
    const ids = getUnlockedContactIds();
    if (!ids.includes(propertyId)) {
      ids.push(propertyId);
      localStorage.setItem(UNLOCKED_STORAGE_KEY, JSON.stringify(ids));
    }
  } catch (err) {
    console.error('Error writing unlocked contact to storage', err);
  }
}
