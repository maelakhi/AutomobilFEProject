const ValidationConfirmPassword = (oldPass, newPass) => {
    const lengthPass = oldPass.length != newPass.length

    if (oldPass == null || newPass == null) {
        return { value: false, message: "Password Not NULL" }
    }else if (lengthPass) {
        return { value: false, message: "Password Not Same" }
    }

    for (let i = 0; i < oldPass.length; i++){
        if (newPass[i] != oldPass[i]) {
            return { value: false, message: "Password Not Same" }
        }
    }
    return { value: true, message: "Password Same" }
}

const ValidationEmail = (oldPass, newPass) => {

    return { value: true, message: "Password Same" }
}


export {
    ValidationConfirmPassword
}