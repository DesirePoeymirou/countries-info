import { useState, useEffect } from 'react';

export const useDebouncedValue = (value: string, wait: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value]);
  return debouncedValue;
};