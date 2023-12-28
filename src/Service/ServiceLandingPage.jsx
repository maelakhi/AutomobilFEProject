import axios from 'axios'

const URLbase = 'https://localhost:7052';


const ServiceLandingPage = {

  async GetCarsLimit() {
    const data = await axios({
      method: "GET",
      url: URLbase + '/productsLimit',
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
      url: URLbase+'/CategoryLimit',
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