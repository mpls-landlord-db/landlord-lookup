import axios from 'axios'

const PROD = 'https://landlord-lookup-mpls.herokuapp.com/api'
const DEV = 'http://localhost:3000/api'

const getApiBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return PROD
    default:
      return DEV
  }
}

const apiBaseUrl = getApiBaseUrl()

export const fetchAddressList = ({ q = '', limit = 20 } = {}) => axios.get(`${apiBaseUrl}/address/search?q=${q}&limit=${limit}`)
export const fetchAddressInfo = ({ q = ''} = {}) => axios.get(`${apiBaseUrl}/address/info?q=${q}`)