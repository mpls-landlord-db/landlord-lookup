const e = require('express')
const {
  findSoftMatchAddresses,
  findRowByAddress,
  findRowsByOwner,
} = require('../queries/addresses')


// Helpers

function aggregate(result) {
  const rv = { totalEntities: 0, entities: [] }
  const entities = {}
  result.forEach(result => {
    result.rows.forEach(row => {
      if (!entities[row.id]) {
        entities[row.id] = {
          data: row,
          matchedBy: [result.searchKey]
        }
      } else {
        entities[row.id].matchedBy.push(result.searchKey)
      }
    })
  })
  rv.entities = Object.keys(entities)
    .map(key => entities[key])
    .sort((a, b) => b.matchedBy.length - a.matchedBy.length)
  rv.totalEntities = rv.entities.length
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
    return res.send(rows)
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
      return res.send(aggregate(result))
    }
    res.status = 404
    return res.send(`We couldn't find any results with the address: ${q}`)
  } catch (error) {
    console.error('[* * * * error * * * *]', error)
    return res.sendStatus(500)
  }
}



module.exports = { searchAddressList, getAddressInfo }