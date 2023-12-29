import React from 'react'

const useLoading = () => {
    const [isLoading, setIsLoading] = React.useState(false)

    const RunLoading = () => setIsLoading(true)
    const EndLoading = () => setIsLoading(false)

    return {
        RunLoading,
        EndLoading,
        isLoading
    }
}

export default useLoading