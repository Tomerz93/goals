import { useState, useEffect } from 'react';
import { query, getDocs, where } from 'firebase/firestore';
import { getCollection } from '@lib/firebase';
import type { WhereFilterOp } from 'firebase/firestore';


export function useQuery<T>(
    collectionName: string,
    documentId: string,
    whereConfig: {
        identifier: string
        operator: WhereFilterOp
    } = { identifier: 'userId', operator: '==' },
) {
    const { identifier, operator } = whereConfig
    const [document, setDocument] = useState<null | T>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!documentId) return;
        const fetchFromDb = async () => {
            setIsLoading(true);
            const collection = getCollection(collectionName);
            const queryResult = query(collection, where(identifier, operator, documentId))
            const result = await getDocs(queryResult)
            console.log(result)
            if (result.empty) setDocument(null)
            else {
                const res = result.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                console.log('not empty')
                setDocument(res) as T
            }
        }
        if (documentId) fetchFromDb()
    }, [collectionName, documentId])
    return {
        document,
        isLoading,
        error,
    };
}


