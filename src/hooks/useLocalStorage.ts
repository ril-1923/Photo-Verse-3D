import { useCallback, useState } from 'react';

/** Small typed localStorage hook with safe parsing. Used for UI-only preferences. */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });
  const update = useCallback((v: T) => {
    setValue(v);
    try { window.localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ }
  }, [key]);
  return [value, update];
}
