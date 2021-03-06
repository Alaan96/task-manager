const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  google: {
    type: Boolean,
    default: false,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  enabled: {
    type: Boolean,
    default: true,
    required: false
  },
  tags: {
    type: Array,
    required: false,
    default: [
      { text: 'Tarea', color: '#66BBD1' },
      { text: 'Salud', color: '#F16D6D' },
      { text: 'Estudios', color: '#72D9A2' },
      { text: 'Eventos', color: '#E9B786' },
    ]
  },
  settings: {
    type: Object,
    required: false,
    default: {
      calendar_week_start: 'Domingo',
      calendar_highlight_weekend: true,
      default_view: 'calendar',
      work_offline: false,
      dark_mode: false,
    }
  }
})

userSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()
  delete userObject.password

  return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} already exist in database.' })

module.exports = mongoose.model('User', userSchema)