import { useState, useEffect } from "react";

/**
 * Custom hook that syncs state with localStorage.
 * Replaces all the duplicated try/catch localStorage patterns.
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if nothing in storage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
