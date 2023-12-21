import axios from 'axios'

const URLbase = 'https://localhost:7052';


const ServiceLogin = {

    async Login(email, password) {
        const data = await axios({
            method: "POST",
            url: URLbase+`/Login`,
            data: { Email:email, Password: password }
        })
        .then((response) => response)
        .catch((err) => err.message )
        
        return data
    },

    async Register(sendData) {
        const data = await axios({
            method: "POST",
            url: URLbase+`/Register`,
            data: sendData
        })
        .then((response) => response)
        .catch((err) => err )
        
        return data
    },

    async VerifiedAccount(sendData) {
        const data = await axios({
            method: "POST",
            url: URLbase+`/verifiedEmail`,
            data: { token: sendData }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    }

}

export {
    ServiceLogin 
}