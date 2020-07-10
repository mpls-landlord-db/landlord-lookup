const router = require('express').Router()
const { searchAddressList, getAddressInfo } = require('./controllers/addresses')

router.get('/address/search', searchAddressList)
router.get('/address/info', getAddressInfo)

module.exports = {
  path: '/api',
  handler: router
}