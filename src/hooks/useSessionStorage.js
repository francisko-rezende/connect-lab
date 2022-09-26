import { useState } from "react";

export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = sessionStorage.getItem(key);
      return item ?? initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
