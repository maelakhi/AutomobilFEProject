import axios from 'axios';

const ServiceAdminDashboard = {
    async GetDashboardProduct(token) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + '/admin/productsDashboard',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
        })
        .then((response) => response)
        .catch((error) => error.response)
        .finally((response) => response)

        return data;
    },

    async GetDashboardUsers(token) {
        const data = axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL + '/admin/usersDashboard',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
        })
        .then((response) => response)
        .catch((error) => error.response)
        .finally((response) => response)

        return data;
    }
}

export default ServiceAdminDashboard