import axios from 'axios';

const ServiceAdminProduct = {
    async GetDataAllProduct() {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + '/admin/products',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async GetDataByIdProduct(Id) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/products/${Id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async DeactivateProduct(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/products/Deactived',
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

    async ActivateProduct(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/products/Actived',
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

    async GetCategoryData() {
        const data = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL+'/admin/Category',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async AddProduct(token, sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL+'/products',
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async EditProduct(token,sendData) {
        const data = await axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL+'/products',
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

    async DeleteProduct(token, sendData) {
        const data = await axios({
            method: "DELETE",
            url: import.meta.env.VITE_BASE_URL+'/products',
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
    }
}

export default ServiceAdminProduct;