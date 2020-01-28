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
  tag: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: false,
  },
  // time: {
  //   type: Object,
  //   required: false
  // },
  // list: {
  //   type: Object,
  //   required: false
  // },
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  author: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  sharedWith: {
    type: Array,
    required: false
  }
})

// taskSchema.plugin(uniqueValidator, { message: '{PATH} already exist in database.' })

module.exports = mongoose.model('Task', taskSchema)