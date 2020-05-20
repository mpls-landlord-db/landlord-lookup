import axios from 'axios'

export const fetchAddressList = ({ search = '', limit = 20 } = {}) => axios.get(`/api/addresses?search=${search}&limit=${limit}`)
export const fetchAddress = ({ address = ''} = {}) => axios.get(`/api/addresses?address=${address}`)