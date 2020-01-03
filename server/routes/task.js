const express = require('express')

const Task = require('../models/task')

const app = express()


app.post('/save-task', (req, res) => {

  let body = req.body

  if (!body.title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required.',
      err: 'Missing required fields.'
    })
  }

  let task = new Task({
    title: body.title,
    description: body.description,
    list: body.list,
    important: body.important,
    urgent: body.urgent,
    time: body.time,
    date: body.date,
    tag: body.tag,
    creationData: body.creationData
  })

  task.save( (err, taskDB) => {
    if (err || !taskDB) {
      return res.status(404).json({
        status: 'error',
        message: 'Failed to create resource.',
        err: err || 'Failed to create resource.'
      })
    }

    return res.status(201).json({
      status: 'success',
      message: 'Task created correctly.',
      task: taskDB
    })
  })

})


app.get('/tasks:id', (req, res) => {
  let id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'ID is required.'
    })
  }
  
  // Define active task property
  let activeTask = {active: true}
  
  const user = { id }

  Task.find({activeTask, user})
      .exec( (err, tasks) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access tasks.',
        err
      })
    }
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'No tasks found.',
        err: 'No tasks found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Tasks loaded correctly',
      tasks
    })
    
  })

})


module.exports = app