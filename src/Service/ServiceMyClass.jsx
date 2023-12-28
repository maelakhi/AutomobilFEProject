import axios from 'axios'

const URLbase = 'https://localhost:7052';


const ServiceMyClass = {

    async GetMyClass(token) {
        const data = await axios({
            method: "GET",
            url: URLbase+`/orderDetailsByUser`,
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