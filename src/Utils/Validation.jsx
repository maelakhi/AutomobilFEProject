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

const ValidatePassword = (Password) => {
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const passwordLength =      Password.length;
    const uppercasePassword =   uppercaseRegExp.test(Password);
    const lowercasePassword =   lowercaseRegExp.test(Password);
    const digitsPassword =      digitsRegExp.test(Password);
    const specialCharPassword = specialCharRegExp.test(Password);
    const minLengthPassword =   minLengthRegExp.test(Password);
    
    if(passwordLength===0){
            return { value: false, message: "Password Not NULL" }
    }else if(!minLengthPassword){
            return { value: false, message: "At least minimum 8 characters" }
    }else if(!uppercasePassword){
            return { value: false, message: "At least one Uppercase" }
    }else if(!lowercasePassword){
            return { value: false, message: "At least one Lowercase" }
    }else if(!digitsPassword){
            return { value: false, message: "At least one digit" }
    }else if(!specialCharPassword){
            return { value: false, message: "At least one Special Characters" }
    } else {
        return { value: true, message: "Strong Password" }
    }

}

// const ValidationEmail = (oldPass, newPass) => {

//     return { value: true, message: "Password Same" }
// }


export {
    ValidationConfirmPassword,
    ValidatePassword
}