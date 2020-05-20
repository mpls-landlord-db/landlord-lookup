const pool = require('../services/database')

const ACTIVE_RENTAL_LICENSES = 'active_rental_licenses_mpls_2020_05_09'


async function getAddressList({ search = '', limit = 20 } = {}) {
  try {
    const sql = `SELECT address FROM ${ACTIVE_RENTAL_LICENSES}
                WHERE address ILIKE $1
                LIMIT $2;`
    const { rows } = await pool.query(sql, [`%${search}%`, limit])
    return rows
  } catch (error) {
    throw error
  }
}

async function getAddress({ address = '' } = {}) {
  try {
    const sql = `SELECT * FROM ${ACTIVE_RENTAL_LICENSES} WHERE address = $1;`
    const { rows } = await pool.query(sql, [address])
    return rows
  } catch (error) {
    throw error
  }
}

module.exports = { getAddress, getAddressList }