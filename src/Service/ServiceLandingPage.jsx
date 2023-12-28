import axios from 'axios'

const ServiceLandingPage = {

  async GetCarsLimit() {
    const data = await axios({
      method: "GET",
      url: import.meta.env.VITE_BASE_URL + '/productsLimit',
      headers:{
        'Content-Type': 'application/json',
        // "Authorization" : `Bearer ${token}`,
      }
    })
    .then((response) => response)
    .catch((err) => console.error(err.message) )
    
    return data
  },

  async GetCategoryData() {
    const data = await axios({
      method: "GET",
      url: import.meta.env.VITE_BASE_URL+'/CategoryLimit',
      headers:{
        'Content-Type': 'application/json',
        // "Authorization" : `Bearer ${token}`,
      }
    })
    .then((response) => response)
    .catch((err) => console.error(err.message))
    
    return data
  }

}

export default ServiceLandingPage