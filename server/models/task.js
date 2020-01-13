const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  description: {
    type: String,
    required: false
  },
  important: {
    type: Boolean,
    required: false
  },
  urgent: {
    type: Boolean,
    required: false
  },
  time: {
    type: Object,
    required: false
  },
  date: {
    type: Date,
    required: false,
  },
  tag: {
    type: String,
    required: false,
    default: 'Tarea'
  },
  list: {
    type: Object,
    required: false
  },
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  author: {
    type: String,
    required: true
  },
  sharedWith: {
    type: Array,
    required: false
  }
})

// userSchema.methods.toJSON = function () {
//   let user = this
//   let userObject = user.toObject()
//   delete userObject.password

//   return userObject
// }

// taskSchema.plugin(uniqueValidator, { message: '{PATH} already exist in database.' })

module.exports = mongoose.model('Task', taskSchema)