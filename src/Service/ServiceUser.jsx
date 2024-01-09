import axios from 'axios'

const ServiceUser = {

    async Login(email, password) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/Login`,
            data: { Email:email, Password: password }
        })
        .then((response) => response)
        .catch((err) => err.message )
        
        return data
    },

    async Register(sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/Register`,
            data: sendData
        })
        .then((response) => response)
        .catch((err) => err )
        
        return data
    },

    async VerifiedAccount(sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/verifiedEmail`,
            data: { token: sendData }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

    async ResetPassword(sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/resetPassword`,
            data: { email: sendData }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

    async VerifieOTPCode(sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/verifiedOTPCode`,
            data: { otpCode: sendData }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

    async CreateNewPassword(sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/createNewPassword`,
            data: sendData
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

}

export default ServiceUser