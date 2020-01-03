// PORT
process.env.PORT = process.env.PORT || 3000

// DATABASE
let urlDB

let online = false

if (!online) {
  urlDB = 'mongodb://localhost:27017/task_manager'
  console.log('Conectando a la base de datos local.')
} else {
  urlDB = 'mongodb+srv://alaan-96_9878:ui9H3pB1lUskGkDb@clouddb-ljqcr.gcp.mongodb.net/test?retryWrites=true&w=majority'
  console.log('Conectando a la base de datos en la nube.')
}

process.env.URLDB = urlDB

// TOKEN EXPIRES
process.env.TOKEN_EXPIRES_IN = 60 * 60 * 24 * 30

// AUTHENTICATION SEED
process.env.SEED = process.env.SEED || 'auth-seed-9878'