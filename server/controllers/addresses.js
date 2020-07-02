const e = require('express')
const {
  findSoftMatchAddresses,
  findRowByAddress,
  findRowsByOwner,
} = require('../queries/addresses')


// Helpers

function aggregate(primary, result) {
  const rv = { totalEntities: 0, primary, secondary: [] }
  const entities = {}
  result.forEach(result => {
    result.rows.forEach(row => {
      if (row.address !== primary.address) {
        if (!entities[row.id]) {
          entities[row.id] = {
            data: row,
            matchedBy: [result.searchKey]
          }
        } else {
          entities[row.id].matchedBy.push(result.searchKey)
        }
      }
    })
  })
  rv.secondary = Object.keys(entities)
    .map(key => entities[key])
    .sort((a, b) => b.matchedBy.length - a.matchedBy.length)
  rv.totalEntities = rv.secondary.length + 1
  return rv
}




// Handlers

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
async function searchAddressList(req, res) {
  try {
    const { q = '', limit = 20 } = req.query
    const { rows } = await findSoftMatchAddresses({ address: q, limit })
    const addresses = rows.map(x => x.address)
    return res.send(addresses)
  } catch (error) {
    console.error('[* * * * error * * * *]', error)
    return res.sendStatus(500)
  }
}

/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
async function getAddressInfo(req, res) {
  try {
    const { q = '' } = req.query
    const { rows: primary } = await findRowByAddress({ address: q })
    if (primary.length) {
      const result = await findRowsByOwner(primary[0])
      return res.send(aggregate(primary[0], result))
    }
    res.status = 404
    return res.send(`We couldn't find any results with the address: ${q}`)
  } catch (error) {
    console.error('[* * * * error * * * *]', error)
    return res.sendStatus(500)
  }
}



module.exports = { searchAddressList, getAddressInfo }