const e = require('express')
const {
  findSoftMatchAddresses,
  findRowByAddress,
  findRowsByOwner,
} = require('../sql/address')


// Helpers
const countVariants = rows => {
  const variantKeys = [
    'owner_name',
    'owner_address1',
    'owner_city',
    'owner_state',
    'owner_zip',
    'owner_email',
    'owner_phone',
  ]
  const accumulator = variantKeys.reduce((acc, key) => ({ ...acc, [key]: {} }), {})
  const variants = rows.reduce((acc, row) => {
    variantKeys.forEach(key => {
      acc[key][row[key].toUpperCase()] = true
    })
    return acc
  }, accumulator)
  return variantKeys.reduce((acc, key) => ({ ...acc, [key]: Object.keys(variants[key]) }), {})
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
    const { rows: primary, rowCount } = await findRowByAddress({ address: q })
    if (rowCount) {
      const { rows: secondary } = await findRowsByOwner(primary[0])
      return res.send({
        primary: primary[0],
        secondary,
        variants: countVariants([...primary, ...secondary])
      })
    }
    res.status = 404
    res.send(`We couldn't find any results with the address: ${q}`)
  } catch (error) {
    console.error('[* * * * error * * * *]', error)
    res.sendStatus(500)
  }
}




module.exports = { searchAddressList, getAddressInfo }