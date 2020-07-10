const app = require('express')()
const { searchAddressList, getAddressInfo } = require('./controllers/addresses')

app.get('/address/search', searchAddressList)
app.get('/address/info', getAddressInfo)

module.exports = {
  path: '/api',
  handler: app
}