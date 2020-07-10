import axios from 'axios'

export const fetchAddressList = ({ q = '', limit = 20 } = {}) => axios.get(`/api/address/search?q=${q}&limit=${limit}`)
export const fetchAddressInfo = ({ q = ''} = {}) => axios.get(`/api/address/info?q=${q}`)