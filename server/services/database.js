const { Pool } = require('pg')

function parseDatabaseUrl() {
  try {
    const [credentials, andTheRest] = process.env.DATABASE_URL
      .slice(process.env.DATABASE_URL.indexOf('://') + 3)
      .split('@')
    const [user, password] = credentials.split(':')
    const [host, andMore] = andTheRest.split(':')
    const [port, database] = andMore.split('/')
    return { user, password, host, port, database }
  } catch (error) {
    throw error
  }
}

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ...parseDatabaseUrl()
})


module.exports = pool

