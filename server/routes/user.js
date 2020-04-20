const express = require('express')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const nodemailer = require('nodemailer')

const User = require('../models/user')
const { authenticate } = require('../middlewares/authentication')
const { setToken, getDecodedToken } = require('../config/token-methods')

const app = express()


// Rgister
app.post('/register', (req, res) => {
  const body = req.body

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required.'
    })
  }

  if (body.password.length < 8) {
    return res.status(400).json({
      status: 'error',
      message: 'Password min length is 8 characters.'
    })
  }

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  })

  user.save( (err, userDB) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: err.errors.email.message || err.errors.password.message || 'Problems creating the user.',
      })
    }

    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    return res.status(201).json({
      status: 'success',
      message: 'User created correctly.',
      user: userDB
    })
  })
})

// Login
app.post('/login', (req, res) => {
  const body = req.body

  if (!body.email) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is required.',
    })
  }

  if (!body.password) {
    return res.status(400).json({
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
        message: 'The emails doesn\'t exist in the database.',
      })
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect password.',
      })
    }

    let token = jwt.sign({ user: userDB }, process.env.AUTHENTICATION_SEED)
    // { expiresIn: process.env.TOKEN_EXPIRES_IN })

    return res.json({
      status: 'success',
      user: userDB,
      token
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
          users,
          totalUsers: users.length
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

// Disable an user
app.put('/user/disable/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }

  const disabled = { enabled: false }

  User.findByIdAndUpdate(id, disabled, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'User disabled correctly.'
    })
  })
})

// Enable an user
app.put('/user/enable/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }

  const enabled = { enabled: true }

  User.findByIdAndUpdate(id, enabled, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'User enabled correctly.'
    })
  })
})

// Delete
app.delete('/user/delete/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }

  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!user) {
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

// Update propery
app.put('/update/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const fields = ['name', 'email', 'settings']

  const body = _.pick(req.body, fields)

  const props = Object.keys(body)

  if (props.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'The fields sent are empty.'
    })
  }

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

// Reset password
app.post('/password-reset', (req, res) => {
  const email = req.body.email

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
            message: 'Unable to access.',
            err
          })
        }

        if (!userDB) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found.'
          })
        }

        let passToken = setToken(userDB.id, userDB.password)
        console.log('Password-token: ' + passToken)


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

        let url = location.origin
        // if (process.env.NODE_ENV !== 'production') {
        //   url = ''
        // }
        const link = `${url}/new-password/${passToken}`

        const mailOptions = {
          from: `"Nout app" ${process.env.EMAIL}`,
          to: email,
          subject: 'Cambio de contraseña',
          text: `Cambio de contraseña - Nout app - Link: ${link}.`,
          html: `
          <main>
            <header>
              <h1>Cambio de contraseña</h1>
              <img src="" alt="Nout">
            </header>
            <div>
              <p>
                Si solicitaste un cambio de contraseña ingresá al link <a href="${link}">${link}</a> o hacé click en el botón.
              </p>
              <button>
                <a href="${link}">Cambiar</a>
              </button>
              
              <button>No fui yo</button>
              <p>Envía informa de la situación.</p>
            </div>
          </main>`
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
              passToken
            })
          }
        })
      })
})

// Set a new password
app.post('/new-password/:passToken', (req, res) => {
  const passToken = req.params.passToken
  const password = req.body.password
  const repeatPassword = req.body.repeatPassword
  
  if (!passToken) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized URL.'
    })
  }

  if (!password || !repeatPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required.'
    })
  }

  if (password.length < 8 || repeatPassword < 8) {
    return res.status(400).json({
      status: 'error',
      message: 'Password min length is 8 characters.'
    })
  }

  if (password !== repeatPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'Password don\'t match.'
    })
  }
  
  const decoded = getDecodedToken(passToken)

  const newPassword = {
    password: bcrypt.hashSync(password, 10)
  }

  User.findByIdAndUpdate(decoded.id, newPassword, { new: true }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
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
      message: 'New password updated.',
      decoded,
      newPassword
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

// Add new tag
app.post('/new-tag/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const text = req.body.text
  const color = req.body.color

  if (text.length === 0 || color.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Text and color fields are required.'
    })
  }

  if (!color.includes('#') && !color.includes('hsl') && !color.includes('rgb')) {
    return res.status(400).json({
      status: 'error',
      message: 'The color isn\'t valid.'
    })
  }

  const tag = {text: text, color: color}

  User.findById(id).exec((err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    const tags = userDB.tags

    const repeatedTag = tags.find(tag => tag.text === text)

    if (repeatedTag) {
      return res.status(400).json({
        status: 'error',
        message: 'The tag was already created.',
        details: `The tag ${text} already exist in database.`
      })
    }

    tags.push(tag)

    userDB.save((err, userUpdated) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Unable to save the tag.',
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
        message: 'Tag saved correctly.',
        tag
      })

    })
  })
})

// Update tag data
app.put('/update-tag/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const text = req.body.text
  const color = req.body.color
  const old_text = req.body.old_text
  const old_color = req.body.old_color
  
  if (text === '' || color === '' || old_text === '' || old_color === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Text and color fields are required.'
    })
  }

  if (!color.includes('#') && !color.includes('hsl') && !color.includes('rgb') && 
    !old_color.includes('#') && !old_color.includes('hsl') && !old_color.includes('rgb')) {
    return res.status(400).json({
      status: 'error',
      message: 'The color isn\'t valid.'
    })
  }

  const tag = { text, color }
  const old_tag = { text: old_text, color: old_color }

  if (tag === old_tag) {
    console.log(tag, old_tag);
    return res.status(400).json({
      status: 'error',
      message: 'No changes found.'
    })
  }

  User.findById(id).exec((err, userDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!userDB) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    const tags = userDB.tags

    const index = tags.findIndex( tag => tag.text === old_text )

    if (index === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'The tag was not found.',
        details: `The tag ${old_text} was not found in database. Try again later.`
      })
    }


    tags.splice(index, 1, tag)

    userDB.save((err, userUpdated) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Unable to save the tag.',
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
        message: 'Tag updated correctly.',
        tag
      })

    })
  })
})

// Delete tag
app.patch('/tag/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const text = req.body.text

  if (text === '') {
    return res.status(400).json({
      status: 'error',
      message: 'No tag selected.'
    })
  }

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.'
      })
    }

    const tags = user.tags

    const tagToRemove = tags.find(tag => tag.text === text)
    
    const position = tags.indexOf(tagToRemove)

    if (position === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Tag not found.'
      })
    }

    // Delete the tag
    tags.splice(position, 1)

    user.save( (err, updatedUser) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Unable to access.',
          err
        })
      }

      if (!updatedUser) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found.'
        })
      }
      return res.json({
        status: 'success',
        message: 'Tag deleted correctly.',
        tag: tagToRemove
      })
    })
  })
})


module.exports = app