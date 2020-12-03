const pool = require('../services/database')

const ACTIVE_RENTAL_LICENSES = process.env.ACTIVE_TABLE


// DYNAMIC QUERY TEMPLATES
const templates = {
  rowsByColname: (colname, comparisonOperator = '=') => (
    `SELECT * FROM ${ACTIVE_RENTAL_LICENSES} WHERE ${colname} ${comparisonOperator} $1;`
  ),
}


const rowByColname = async (searchKey = '', searchVal = '', comparisonOperator = '=') => {
  const rv = { searchKey, searchVal, rowCount: 0, rows: [] }
  try {
    if (!searchVal.trim()) {
      return rv
    }
    const result = await pool.query(templates.rowsByColname(searchKey, comparisonOperator), [searchVal])
    rv.rows = result.rows
    rv.rowCount = result.rowCount
  } catch (error) {
    throw error
  } finally {
    return rv
  }
}


// DB QUERY FACTORIES
const queries = {
  findSoftMatchAddresses: ({ address, limit }) => (
    pool.query(`SELECT address FROM ${ACTIVE_RENTAL_LICENSES}
      WHERE address ILIKE $1
      LIMIT $2`, [`%${address}%`, limit])
  ),

  findRowByAddress: ({ address }) => (
    pool.query(`SELECT * FROM ${ACTIVE_RENTAL_LICENSES} 
      WHERE address = $1;`, [address])
  ),

  findRowsByOwner: ({ owner_name, owner_address1, owner_email, owner_phone }) => {
    return Promise.all([
      rowByColname('owner_address1', owner_address1),
      rowByColname('owner_email', owner_email),
      rowByColname('owner_name', owner_name),
      rowByColname('owner_phone', owner_phone),
    ])
  }
}

module.exports = queries
