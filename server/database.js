let mongoose = require('mongoose')

let server = 'mongodb://localhost:27017/'

let database = 'task-manager'

// mongoose.set('useFindAndMofify', false) // err
// mongoose.Promise = global.Promise
mongoose.connect(`${server}${database}`, { useNewUrlParser: true })
  .then(() => {
    console.log(`

La conexión a la base de datos se ha realizado con éxito.

`)
  })
  .catch((error) => {
    console.log(`

Error en la conexión a la base de datos.

${error}
`)
  })

module.exports = mongoose