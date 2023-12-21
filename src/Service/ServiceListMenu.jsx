import axios from 'axios'

const URLbase = 'https://localhost:7052';


const ServiceListMenu = {

    async GetDataCarByType(Id) {
        const data = await axios({
            method: "GET",
            url: URLbase+`/category/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message) )
        
        return data
    },
    
    // async GetDataCarRelateType(categoryName) {
    //     const data = await axios({
    //         method: "GET",
    //         url: URLbase+`/productsByCategoryId/${categoryName}`,
    //         headers:{
    //             'Content-Type': 'application/json',
    //             // "Authorization" : `Bearer ${token}`,
    //         }
    //     })
    //     .then((response) => response)
    //     .catch((err) => console.error(err.message) )
        
    //     return data
    // },
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
        .catch((err) => console.error(err.message) )
        
        return data
    }

}

export default ServiceListMenu