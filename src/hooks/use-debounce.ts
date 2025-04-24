// hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value.
 * 
 * @template T - The type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} [delay=500] - The delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value or delay changes before the timer completes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}