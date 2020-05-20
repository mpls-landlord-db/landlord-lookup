const router = require('express').Router()
const { getAddress, getAddressList } = require('./controllers/addresses')

router.get('/addresses', async (req, res) => {
  try {
    if (req.query.search) {
      const result = await getAddressList({
        search: req.query.search,
        limit: req.query.limit,
      })
      res.send(result)
    } else if (req.query.address) {
      const result = await getAddress({ address: req.query.address })
      res.send(result)
    }
  } catch (error) {
    console.log('[error - GET /api/addresses]:', error)
    res.sendStatus(500)
  }
})

module.exports = router