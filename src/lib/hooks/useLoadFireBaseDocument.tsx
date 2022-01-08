import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getRef } from '@lib/firebase';

export function useLoadFIreBaseDocument<T>(
  collection: string,
  documentId: string,
  transformers?: [(data: any) => T]
) {
  const [document, setDocument] = useState<null | T>(null);
  const [isLoading, setLisLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!documentId) return;
    const ref = getRef(collection, documentId);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      snapshot.exists() ? setDocument(snapshot.data() as T) : setDocument(null);
      setLisLoading(false);
    });
    return () => unsubscribe();
  }, [collection, documentId]);

  return {
    document,
    isLoading,
    error,
  };
}
