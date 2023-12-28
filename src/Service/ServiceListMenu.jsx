import axios from 'axios'

const ServiceListMenu = {

    async GetDataCarByType(Id) {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+`/category/${Id}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message) )
        
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
        .catch((err) => console.error(err.message) )
        
        return data
    },
        // async GetDataCarRelateType(categoryName) {
    //     const data = await axios({
    //         method: "GET",
    //         url: import.meta.env.VITE_BASE_URL+`/productsByCategoryId/${categoryName}`,
    //         headers:{
    //             'Content-Type': 'application/json',
    //             // "Authorization" : `Bearer ${token}`,
    //         }
    //     })
    //     .then((response) => response)
    //     .catch((err) => console.error(err.message) )
        
    //     return data
    // },

}

export default ServiceListMenu