import React from 'react'

const useFlag = () => {
    const [flag, setFlag] = React.useState(false)
    const IsFlag = () => setFlag(prev => !prev)

    return {
        flag,
        IsFlag
    }
}

export default useFlag