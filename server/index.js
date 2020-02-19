if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('./config/config')

const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// API routes
app.use(require('./routes/index'))

// Import database
const db = require('./database')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
