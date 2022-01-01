import { useState } from 'react'

export const useAsyncCall = (
    asyncCall: (...args: any) => Promise<void>,
) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<any>('')
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

