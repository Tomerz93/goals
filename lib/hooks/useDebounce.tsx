import { useState, useEffect } from 'react';

export const useDebounce = (
  value: string | number,
  delay: number = 300
): string | number => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};
