const pool = require('../services/database')

const ACTIVE_RENTAL_LICENSES = 'active_rental_licenses_mpls_2020_05_09'


// regex pattern creaters
const reOwnerPhone = ownerPhone => {
  const digits = ownerPhone.match(/\d/g).join('')
  return `\\(?${digits.slice(0, 3)}\\)?(-|\\s)?${digits.slice(3, 6)}(-|\\s)${digits.slice(6)}`
}

// queries
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
  
  findRowsByOwner: ({ address, owner_name, owner_address1, owner_email, owner_phone }) => (
    pool.query(`SELECT * FROM ${ACTIVE_RENTAL_LICENSES}
      WHERE
        address != $1 AND (
          owner_name ilike $2 OR
          owner_address1 ilike $3 OR
          owner_email ilike $4 OR
          owner_phone ~ $5
        );`, [address, owner_name, owner_address1, owner_email, reOwnerPhone(owner_phone)])
  ),
}

module.exports = queries
