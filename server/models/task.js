const mongoose = require('mongoose')

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
  tag: {
    type: Object,
    required: true,
    default: {text: 'Tarea', color: '#66BBD1'}
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String,
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

module.exports = mongoose.model('Task', taskSchema)