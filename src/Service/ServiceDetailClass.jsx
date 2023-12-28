import axios from 'axios'

const ServiceDetailClass = {
    async GetDetailClass(Id) {
        const data = await axios({
            method: 'GET',
            url: import.meta.env.VITE_BASE_URL + `/products/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => err.response)
        
        return data
    },

    async GetDataCarRelateType(Id) {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+`/productsByCategoryId/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

    async AddToCart(token, date, idProduct) {
        const senData = {
            idProduct: idProduct,
            dateSchedule: date
        }
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+`/carts`,
            headers:{
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`,
            },
            data: senData
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    },

}

export default ServiceDetailClass