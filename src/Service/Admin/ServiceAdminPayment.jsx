import axios from 'axios';

const ServiceAdminPayment = {
    async GetPaymentById(Id) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/paymentMethod/${Id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((error) => error.response)
        .finally((response) => response)

        return data;
    },

    async GetPayment() {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+'/admin/paymentMethod',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        .finally((response) => response)
        
        return data
    },

    async GetPaymentAdmin() {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+'/admin/paymentMethod',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        .finally((response) => response)
        
        return data
    },

    async AddPayment(token, sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+'/paymentMethod',
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        .finally((response) => response)
        
        return data
    },

    async EditPayment(token,sendData) {
        const data = await axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL+'/paymentMethod',
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        .finally((response) => response)
        
        return data
    },

    async DeletePayment(token, sendData) {
        const data = await axios({
            method: "DELETE",
            url: import.meta.env.VITE_BASE_URL+'/paymentMethod',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        .finally((response) => response)
        
        return data
    },

    async DeactivatePayment(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/paymentMethod/Deactived',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: id
        })
        .then((response) => response)
        .catch((error) => error.response)
        .finally((response) => response)

        return data;
    },

    async ActivatePayment(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/paymentMethod/Actived',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: id
        })
        .then((response) => response)
        .catch((error) => error.response)
        .finally((response) => response)

        return data;
    },

}

export default ServiceAdminPayment;