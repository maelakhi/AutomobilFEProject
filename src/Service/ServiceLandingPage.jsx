import axios from 'axios'

const URLbase = 'http://52.237.194.35:2024'


const ServiceLandingPage = {

  async GetCarsLimit() {
    const data = await axios({
      method: "GET",
      url: URLbase + '/api/Menu/GetMenuLimit',
      headers:{
        'Content-Type': 'application/json',
        // "Authorization" : `Bearer ${token}`,
      }
    })
    .then((response) => response)
    .catch((err) => err.response)
    
    return data
  },

  async GetCategoryData() {
    const data = await axios({
      method: "GET",
      url: URLbase+'/api/Type/GetActiveType',
      headers:{
        'Content-Type': 'application/json',
        // "Authorization" : `Bearer ${token}`,
      }
    })
    .then((response) => response)
    .catch((err) => err.response)
    
    return data
  }

}

export default ServiceLandingPage