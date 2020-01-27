const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let token
let secretKey

// Set token
const setToken = (id, pass) => {
  if (id && pass) {
    secretKey = `${bcrypt.hashSync(pass, 9)}-${new Date().getTime()}`
    token = jwt.sign({ id: id }, secretKey, { expiresIn: 60 * 60 })
    return token
  } else {
    console.log('Undefined params.')
  }
}

// Get token
const getDecodedToken = (token) => {
  if (token) {
    let decoded = jwt.verify(token, secretKey)
    return decoded
  } else {
    console.log('Undefined params.')
  }
}

module.exports = {
  setToken,
  getDecodedToken
}