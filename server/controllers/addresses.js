const e = require('express')
const {
  findSoftMatchAddresses,
  findRowByAddress,
  findRowsByOwner,
} = require('../queries/addresses')


// Helpers

function aggregate(result) {
  const rv = { totalEntities: 0, entities: [], searchMatchGraph: {} }
  const recorded = {}
  result.forEach(result => {
    rv.searchMatchGraph[result.searchKey] = {
      rowIds: [],
      rowCount: result.rowCount,
      searchVal: result.searchVal
    }
    result.rows.forEach(row => {
      rv.searchMatchGraph[result.searchKey].rowIds.push(row.id)
      if (!recorded[row.id]) {
        rv.entities.push(row)
        recorded[row.id] = true
      }
    })
  })
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