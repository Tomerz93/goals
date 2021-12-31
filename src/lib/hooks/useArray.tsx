import { useState } from 'react';

interface ObjectWithId {
  id: string;
}

export function useArray<T>(initialValue: T[]) {
  const [data, setData] = useState(initialValue);
  const push = (item: T) => setData([...data, item]);
  const removeFirst = () => setData((prev) => [...prev.slice(1)]);
  const remove = (id: string) =>
    setData((prev) => prev.filter((item) => item.id !== id));
  const pop = () => setData((prev) => [...prev.slice(0, -1)]);
  const exists = (id: string) => data.some((item) => item.id === id);
  const get = (id: string) => data.find((item) => item.id === id);
  return {
    data,
    removeFirst,
    pop,
    push,
    remove,
    exists,
    get,
  };
}
