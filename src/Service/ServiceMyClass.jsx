import axios from 'axios'

const ServiceMyClass = {

    async GetMyClass(token) {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+`/orderDetailsByUser`,
            headers:{
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message) )
        
        return data
    },
}

export default ServiceMyClass;