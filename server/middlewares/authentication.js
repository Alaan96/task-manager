const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  let token = req.get('token')

  if (!token) {
    return res.status(404).json({
      status: 'error',
      message: 'Token is required.'
    })
  }

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized content.',
        err
      })
    }
    // console.log(decoded)
    req.user = decoded.user
  })
  next()
}

module.exports = {
  authenticate
}