const express = require('express')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('underscore')

const User = require('../models/user')

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

    let token = jwt.sign({
      user: userDB
    }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES_IN})

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
app.get('/users', (req, res) => {
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
app.get('/user/:id', (req, res) => {
  let id = req.params.id

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
app.delete('/user/disable/:id', (req, res) => {
  let id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }

  let disabled = { enabled: false }

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

// Incomplete
// Reset password
app.post('/reset-password', (req, res) => {
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

  User.findOne({user_email})
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

        res.json({
          status: 'Incomplete',
          message: 'This route is incomplete.'
        })

      })
})

// Set user birthday date
app.post('/set-birthday', (req, res) => {
  let birthday = req.body.birthday

  if (!birthday) {
    return res.status(400).json({
      status: 'error',
      message: 'Birthday field is required.'
    })
  }
  let actualDate = new Date()

  let minDate = new Date(1900, 0).getTime()
  let maxDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()).getTime()

  if (birthday < minDate || birthday > maxDate) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid birthday, only dates between 1900 - ${actualDate.getFullYear()}.`
    })
  }

  // const test = /^(\d){1,2}\/(\d){1,2}\/(\d){4}$/.test(birthday)

  let id = req.body.id

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
app.put('/user/:id', (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body, ['name', 'email'])

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


module.exports = app