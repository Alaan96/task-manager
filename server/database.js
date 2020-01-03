let mongoose = require('mongoose')

mongoose.connect(process.env.URLDB,
                { useNewUrlParser: true,
                  useFindAndModify: false,
                  useCreateIndex: true,
                  useUnifiedTopology: true })
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