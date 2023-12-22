import axios from 'axios'

const URLbase = 'https://localhost:7052';

const ServiceDetailClass = {
    async GetDetailClass(Id) {
        const data = await axios({
            method: 'GET',
            url: URLbase + `/products/${Id}`,
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
            url: URLbase+`/productsByCategoryId/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => err.response )
        
        return data
    }
}

export default ServiceDetailClass