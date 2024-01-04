import axios from 'axios'

const ServiceCheckout = {

  async GetItems(token) {
      const data = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + '/carts',
        headers:{
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        }
      })
      .then((response) => response)
      .catch((err) => err.response )
      
      return data
  },

  async GetPaymentMethod(token) {
    const data = await axios({
      method: 'GET',
      url: import.meta.env.VITE_BASE_URL + `/paymentMethod`,
      headers:{
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then((response) => response)
    .catch((err) => err.response)
    
    return data;
  },
    
  async DeleteItem(token, idCart) {
      const sendData = {
          idCart : idCart,
      }
      const data = await axios({
          method: "DELETE",
          url: import.meta.env.VITE_BASE_URL+`/carts/${idCart}`,
          headers:{
              'Content-Type': 'application/json',
              "Authorization" : `Bearer ${token}`,
          },
          data: sendData
      })
      .then((response) => response)
      .catch((err) => err.response )
      
      return data
  },

  async CheckOutInvoice(token, idPayment, selectedItems) {
    const sendData = {
      idPayment: idPayment,
      cartsID:selectedItems
    }
    const data = await axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + `/orderInvoice`,
      headers:{
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
      },
      data: sendData
    })
    .then((response) => response)
    .catch((err) => err.response)
    
    return data;
  }

}

export default ServiceCheckout;