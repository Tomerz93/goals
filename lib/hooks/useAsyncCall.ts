import { useState, useEffect } from 'react'

export function useAsyncCall<T>(
    asyncCall: (...args: any) => Promise<void>,
    fireOnMount?: boolean,
) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<any>('')
    useEffect(() => {
        (async () => {
            if (fireOnMount) {
                setIsLoading(true)
                try {
                    const data = await asyncCall()
                    setIsSuccess(true)
                    setError('')
                    setIsLoading(false)
                    setData(data)

                } catch (error) {
                    setIsLoading(false)
                    setError(error?.message)
                }
            }
        })()
    }, [])
    const call = async (...args: any) => {
        setIsLoading(true)
        try {
            await asyncCall(...args)
            setIsLoading(false)
            setIsSuccess(true)
        } catch (error) {
            setError(error)
            setIsLoading(false)
            setIsSuccess(false)
        }
    }
    return { data, isLoading, error, call, isSuccess }
}

