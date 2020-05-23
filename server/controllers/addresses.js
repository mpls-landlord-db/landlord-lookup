const e = require('express')
const pool = require('../services/database')

const ACTIVE_RENTAL_LICENSES = 'active_rental_licenses_mpls_2020_05_09'


/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
async function searchAddressList(req, res) {
  try {
    const { q = '', limit = 20 } = req.query
    const sql = `SELECT address FROM ${ACTIVE_RENTAL_LICENSES}
      WHERE address ILIKE $1
      LIMIT $2;`
    const { rows } = await pool.query(sql, [`%${q}%`, limit])
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
    const sql = `SELECT * FROM ${ACTIVE_RENTAL_LICENSES} WHERE address = $1`
    const result1 = await pool.query(sql, [q])
    if (result1.rowCount > 0) {
      const { owner_name, ownerName } = result1.rows[0]
      console.log({ ownerName, owner_name })
      const result2 = await pool.query(`SELECT * FROM ${ACTIVE_RENTAL_LICENSES} WHERE owner_name ILIKE $1;`, [owner_name])
      return res.send(result2.rows)
    }
    res.status = 404
    return res.send(`We couldn't find any results with the address: ${q}`)
  } catch (error) {
    console.error('[* * * * error * * * *]', error)
    return res.sendStatus(500)
  }
}




module.exports = { searchAddressList, getAddressInfo }