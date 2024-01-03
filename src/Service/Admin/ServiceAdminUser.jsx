import axios from "axios";

const ServiceAdminUser = {
     async GetUsers(token) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/users`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async GetDataByIdUser(token,Id) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + `/users/${Id}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((response) => response)
        .catch((error) => error.response)

        return data;
    },

    async DeactivateUser(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/user/Deactived',
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

    async ActivateUser(token, id) {
        const data = axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL + '/user/Actived',
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

    async RegisterAdmin(token, sendData) {
        const data = await axios({
            method: "POST",
            url: import.meta.env.VITE_BASE_URL + '/admin/Register',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => err )
        
        return data
    },

    async DeleteUser(token, id) {
        const data = await axios({
            method: "DELETE",
            url: import.meta.env.VITE_BASE_URL+'/user',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            data: id
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },

    async EditUser(token,sendData) {
        const data = await axios({
            method: "PUT",
            url: import.meta.env.VITE_BASE_URL+'/users',
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            data: sendData
        })
        .then((response) => response)
        .catch((err) => console.error(err.message))
        
        return data
    },
}

export default ServiceAdminUser