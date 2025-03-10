/**
 * Obtém um valor do localStorage com tipagem segura
 */
export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Define um valor no localStorage com serialização segura
 */
export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Remove um valor do localStorage
 */
export function removeLocalStorage(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}
