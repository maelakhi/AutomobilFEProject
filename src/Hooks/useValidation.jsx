import React from 'react'

const useValidation = (value, valueTwo, funcValidation) => {
    const initialValue = {
        value: true,
        message: ''
    }
    const [validation, setValidation] = React.useState(initialValue)

    React.useEffect(() => {
        if (value != "") {
            let validationPass;
            if (valueTwo) {
                validationPass = funcValidation(value, valueTwo)
            } else {
                validationPass = funcValidation(value)
            }
            setValidation(validationPass)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [funcValidation, value]);
    
    return {
        validation,
    }
}

export default useValidation