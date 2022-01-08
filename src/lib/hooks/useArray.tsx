import { useState } from 'react';

export function useArray<T>(initialValue: T[]) {
  const [data, setData] = useState(initialValue);
  const push = (item: T) => setData([...data, item]);
  const addMany = (items: T[]) => setData([...data, ...items]);
  const removeMany = (indexes: Array<number>) =>
    setData(data.filter((_, index) => !indexes.includes(index)));
  const set = (items: T[]) => setData(items);
  const removeFirst = () => setData((prev) => [...prev.slice(1)]);
  const remove = (index: number) =>
    setData((prev) => prev.filter((item, i) => i !== index));
  const pop = () => setData((prev) => [...prev.slice(0, -1)]);
  const exists = (id: string) => data.some((item) => item.id === id);
  const get = (id: string) => data.find((item) => item.id === id);

  return {
    data,
    removeFirst,
    pop,
    addMany,
    removeMany,
    push,
    remove,

    exists,
    get,
    set,
  };
}
