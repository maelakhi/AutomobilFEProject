import axios from 'axios';

const ServiceAdminCategory = {
    async GetCategoryById(Id) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/category/${Id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async GetCategoryData() {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+'/Category',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async AddCategory(token, sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+'/category',
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async EditCategory(token,sendData) {
        const data = await axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL+'/category',
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async DeleteCategory(token, sendData) {
        const data = await axios({
            method: "DELETE",
            url: import.meta.env.VITE_BASE_URL+'/category',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async DeactivateCategory(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/category/Deactived',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: id
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async ActivateCategory(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/category/Actived',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: id
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

}

export default ServiceAdminCategory;