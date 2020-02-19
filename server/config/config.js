// PORT
process.env.PORT = process.env.PORT || 3000

// DATABASE
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'cloud') {
  process.env.URLDB = process.env.CLOUD_DB
  console.log(`Conectando a la base de datos en la nube.`)
} else {
  process.env.URLDB = process.env.LOCAL_DB
  console.log(`Conectando a la base de datos local.`)
}

// TOKEN EXPIRES
process.env.TOKEN_EXPIRES_IN =  60 * 60 * 24 * 30