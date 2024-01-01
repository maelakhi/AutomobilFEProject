import axios from 'axios';

const ServiceAdminInvoice = {
    async GetInvoiceData(token) {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + '/admin/invoice',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
        })
        .then((response) => response)
        .catch((error) => error.response)
        
        return data;
    },

    async GetInvoiceById(token, id) {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/admin/invoice/${id}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
        })
        .then((response) => response)
        .catch((error) => error.response)
        
        return data;
    }
}

export default ServiceAdminInvoice