const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const nodemailer = require('nodemailer')

const User = require('../models/user')
const { authenticate } = require('../middlewares/authentication')
const { setToken, getDecodedToken } = require('../config/token-methods')

const app = express()

// Login
app.post('/login', (req, res) => {
  let body = req.body

  if (!body.email) {
    return res.status(404).json({
      status: 'error',
      message: 'Email is required.',
    })
  }

  if (!body.password) {
    return res.status(404).json({
      status: 'error',
      message: 'Password is required.',
    })
  }

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Cannot access to database.',
        err
      })
    }

    /********** CAUTION **********/
    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'Incorrect email.',
        err: 'Incorrect email.'
      })
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(404).json({
        status: 'error',
        message: 'Incorrect password.',
        err: 'Incorrect password.',
      })
    }

    let token = jwt.sign({user: userDB}, process.env.SEED)
      // { expiresIn: process.env.TOKEN_EXPIRES_IN })

    return res.json({
      status: 'success',
      user: userDB,
      token
    })
  })
})

// Signin
app.post('/signin', (req, res) => {
  let body = req.body

  if ( !body.name || !body.email || !body.password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required.',
      err: 'Missing fields.'
    })
  }

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  })

  user.save( (err, userDB) => {
    if (err || !userDB) {
      return res.status(400).json({
        status: 'error',
        message: err.errors.email.message || err.errors.password.message || 'Invalid request.',
        err: err || 'Invalid request.'
      })
    }

    return res.status(201).json({
      status: 'success',
      message: 'User created correctly.',
      user: userDB
    })
  })
})

// Get all users
app.get('/users', authenticate, (req, res) => {
  let validUser = { enabled: true }

  // Options
  let limit = Number(req.query.limit) || 10

  User.find(validUser)
      .limit(limit)
      .exec( (err, users) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Unable to access users.',
            err
          })
        }

        if (!users) {
          return res.status(404).json({
            status: 'error',
            message: 'Users not found.'
          })
        }
        
        return res.json({
          status: 'success',
          message: users.length === 0 ? 'There are no users yet.' : 'Users loaded correctly.',
          users
        })
      })
})

// Get one specific user
app.get('/user/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }
  
  User.findById(id)
      .exec( (err, userDB) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Unable to access users.',
            err
          })
        }

        if (!userDB) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found.'
          })
        }
        
        return res.json({
          status: 'success',
          message: 'User loaded correctly.',
          user: userDB
        })

      })
})

// 'Delete' an user
app.delete('/user/disable/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }

  const disabled = { enabled: false }

  User.findByIdAndUpdate(id, disabled, { new: true }, (err, userDeleted) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access users.',
        err
      })
    }

    if (!userDeleted) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'User deleted correctly.'
    })
  })
})

// Reset password
app.post('/password-reset', authenticate, (req, res) => {
  let email = req.body.email

  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is required.'
    })
  }

  let user_email = {
    email
  }

  User.findOne(user_email)
      .exec( (err, userDB) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Unable to access users.',
            err
          })
        }

        if (!userDB) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found with that email.'
          })
        }

        let token = setToken(userDB.id, userDB.password)
        console.log('Token: ' + token)


        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: 'gmail',
          port: 587,
          // secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: `"Alan Test" ${process.env.EMAIL}`,
          to: email,
          subject: 'Password reset - APP',
          text: "Hello world?",
          html: `
          <b>Hello world?</b>
          <h1>Link de cambio de contraseña</h1>
          <a href="http://localhost:3000/new-password/${token}">
            http://localhost:3000/new-password/${token}
          </a>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log('Error al enviar el mail :c', err)
            return res.status(500).json({
              status: 'error',
              message: 'Unable to send the email.',
              err
            })
          }

          if (info) {
            console.log('Se ha enviado el mail c:', info)
            return res.json({
              status: 'success',
              message: 'Email sent.',
              info,
              token
            })
          }
        })
      })
})

// Set a new password
app.post('/new-password/:token', authenticate, (req, res) => {
  const token = req.params.token
  const password = req.body.password
  
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized URL.'
    })
  }

  if (!password) {
    return res.status(404).json({
      status: 'error',
      message: 'New password is required.'
    })
  }
  
  const decoded = getDecodedToken(token)

  const newPassword = {
    password
  }

  User.findByIdAndUpdate(decoded.id, newPassword, { new: true }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access users.',
        err
      })
    }

    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    return res.json({
      status: 'test',
      message: 'Testing decoded token.',
      decoded,
      newPass
    })
  })
})

// Set user birthday date
app.post('/set-birthday/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  let rawBd = req.body.birthday.split('/')
  console.log(rawBd)

  const birthday = new Date(
    parseInt(rawBd[2]),
    parseInt(rawBd[1] - 1),
    parseInt(rawBd[0]))
    .getTime()

  if (!birthday) {
    return res.status(400).json({
      status: 'error',
      message: 'Birthday field is required.'
    })
  }
  let actualDate = new Date()

  let minDate = new Date(1900, 0).getTime()
  // let maxDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()).getTime()
  let maxDate = actualDate.getTime()

  if (birthday < minDate || birthday > maxDate) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid birthday, only dates between 1900 - ${actualDate.getFullYear()}.`
    })
  }

  User.findById(id)
      .exec( (err, userDB) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Unable to set birthday.',
            err
          })
        }

        if (!userDB) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found.'
          })
        }

        userDB.birthday = birthday
        userDB.save( (err, userUpdated) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              message: 'Unable to save user.',
              err
            })
          }

          if (!userUpdated) {
            return res.status(404).json({
              status: 'error',
              message: 'User not found.'
            })
          }

          return res.json({
            status: 'success',
            message: 'The birthday has been set correctly.'
          })

        })

      })
})

// Update propery
app.put('/user/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  let fields = ['name', 'email', 'weekStart', 'defaultView']

  const body = _.pick(req.body, fields)

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to update the property.',
        err
      })
    }
    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
      })
    }

    return res.json({
      status: 'success',
      message: 'Property updated correctly.',
      user: userDB
    })
  })
})

// Add new custom tag
app.post('/user/new-tag/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const tag = req.body.tag

  if (!tag) {
    return res.status(404).json({
      status: 'error',
      message: 'Tag not found.'
    })
  }

  User.findById(id).exec((err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to save the tag.',
        err
      })
    }

    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    userDB.tags.push(tag)

    userDB.save((err, userUpdated) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Unable to save data.',
          err
        })
      }

      if (!userUpdated) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found.'
        })
      }

      return res.json({
        status: 'success',
        message: 'Tag setted correctly.'
      })

    })
  })
})


module.exports = app