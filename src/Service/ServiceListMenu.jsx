import axios from 'axios'

const URLbase = 'http://52.237.194.35:2024'


const ServiceListMenu = {

    async GetDataCarByType(typeName) {
        const data = await axios({
            method: "GET",
            url: URLbase+`/api/Type/GetTypeByName?name=${typeName}`,
            headers:{
                'Content-Type': 'application/json',
                // "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message) )
        
        return data
    },
    
    async GetDataCarRelateType(categoryName) {
        const data = await axios({
            method: "GET",
            url: URLbase+`/api/Menu/GetMenuByTypeName?type_name=${categoryName}`,
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