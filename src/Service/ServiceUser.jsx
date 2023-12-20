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
        .catch((err) => console.error(err.message) )
        
        return data
    },

    async Register(sendData) {
        const data = await axios({
            method: "POST",
            url: URLbase+`/Register`,
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err) )
        
        return data
    }
}

export {
    ServiceLogin 
}