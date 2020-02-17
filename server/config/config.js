// PORT
process.env.PORT = process.env.PORT || 3000

// DATABASE
if (process.env.NODE_ENV === 'cloudDevelopment') {
  process.env.URLDB = process.env.CLOUD_DB
  // console.log(`Conectando a la base de datos en la nube${loadingEfect()}`)
  console.log(`Conectando a la base de datos en la nube.`)
} else {
  process.env.URLDB = process.env.LOCAL_DB
  // console.log(`Conectando a la base de datos local${loadingEfect()}`)
  console.log(`Conectando a la base de datos local.`)
}

// TOKEN EXPIRES
process.env.TOKEN_EXPIRES_IN =  60 * 60 * 24 * 30

// AUTHENTICATION SEED
process.env.SEED = process.env.SEED || 'auth-seed-9878'

// Email test
process.env.EMAIL = 'alantestmail03@gmail.com'
process.env.PASS = 'passdelmail'
