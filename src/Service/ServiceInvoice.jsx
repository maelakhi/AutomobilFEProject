import axios from 'axios'

const ServiceInvoice = {

  async GetInvoice(token) {
      const data = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + '/invoice',
        headers:{
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        }
      })
      .then((response) => response)
      .catch((err) => err.response )
      
      return data
  },


}

export default ServiceInvoice;