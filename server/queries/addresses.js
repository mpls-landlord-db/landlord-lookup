const pool = require('../services/database')

const ACTIVE_RENTAL_LICENSES = 'active_rental_licenses_mpls_2020_05_09'


// regex pattern creaters
const reOwnerPhone = ownerPhone => {
  const digits = ownerPhone.match(/\d/g).join('')
  return `\\(?${digits.slice(0, 3)}\\)?(-|\\s)?${digits.slice(3, 6)}(-|\\s)${digits.slice(6)}`
}


const createStringValidator = (values, initParamCounter = 0) => {
  let paramCounter = initParamCounter
  return {
    any() {
      return Object.keys(values).some(key => this.exists(key))
    },
    exists(key) {
      return !!values[key].trim()
    },
    getNextParam() {
      return `$${++paramCounter}`
    },
    getValidValues(keys, wrappers) {
      return keys.reduce((acc, key) => {
        if (this.exists(key)) {
          const val = wrappers[key] ? wrappers[key](values[key]) : values[key]
          acc.push(val)
        }
        return acc
      }, [])
    },
  }
}

const orIfAny = values => values.some(x => !!x) ? 'OR' : ''


// DYNAMIC QUERY TEMPLATES
const dynamicTemplates = {
  rowsByOwner({ address, owner_name, owner_address1, owner_email, owner_phone }) {
    let statement = `SELECT * FROM ${ACTIVE_RENTAL_LICENSES} WHERE address != $1`
    const validator = createStringValidator({ owner_name, owner_address1, owner_email, owner_phone }, 1)
    const anyIsValid = validator.any()
    const isOwnerName = validator.exists('owner_name')
    const isOwnerAddress1 = validator.exists('owner_address1')
    const isOwnerEmail = validator.exists('owner_email')
    const isOwnerPhone = validator.exists('owner_phone')
    if (anyIsValid) {
      statement += ` AND (`
      if (isOwnerName) {
        statement += `owner_name ILIKE ${validator.getNextParam()}`
      }
      if (isOwnerAddress1) {
        statement +=` ${orIfAny([isOwnerName])} owner_address1 ILIKE ${validator.getNextParam()}`
      }
      if (isOwnerEmail) {
        statement += ` ${orIfAny([isOwnerName, isOwnerAddress1])} owner_email ILIKE ${validator.getNextParam()}`
      }
      if (isOwnerPhone) {
        statement += ` ${orIfAny([isOwnerName, isOwnerAddress1, isOwnerEmail])} owner_phone ~ ${validator.getNextParam()}`
      }
      statement += ');'
    }
    const args = [
      address,
      ...validator.getValidValues(['owner_name', 'owner_address1', 'owner_email', 'owner_phone'], { owner_phone: reOwnerPhone })
    ]
    const rv = { statement, args }
    if (process.env.DEBUG) {
      console.log(rv)
    }
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
  
  findRowsByOwner: ({ address, owner_name, owner_address1, owner_email, owner_phone }) => {
    const { statement, args } = dynamicTemplates.rowsByOwner({
      address,
      owner_name,
      owner_address1,
      owner_email,
      owner_phone
    })
    return pool.query(statement, args)
  }
}

module.exports = queries
