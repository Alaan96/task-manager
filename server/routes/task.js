const express = require('express')

const Task = require('../models/task')
const { authenticate } = require('../middlewares/authentication')

const app = express()

// Save new task
app.post('/save-task/:id', authenticate, (req, res) => {
  const id  = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const body = req.body

  console.log(body)


  if (!body.title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required.'
    })
  }

  let task = new Task({
    title: body.title,
    description: body.description,
    tag: body.tag,
    important: body.important,
    urgent: body.urgent,
    author: id,
    date: body.date,
    // time: body.time,
    // list: body.list,
  })

  task.save( (err, taskDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Database error.',
        err
      })
    }

    if (!taskDB) {
      return res.status(404).json({
        status: 'error',
        message: 'Failed to create resource.',
      })
    }

    return res.status(201).json({
      status: 'success',
      message: 'Task created correctly.',
      task: taskDB
    })
  })

})

// Get last task saved
app.get('/last-saved/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const author = {
    author: id
  }
  

  Task.findOne(author).sort({ $natural: -1 }).exec( (err, lastTask) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error getting the task.',
        err
      })
    }

    if (!lastTask) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Last task get correctly.',
      task: lastTask
    })
  })
})


/*app.get('/task/:id', authenticate, (req, res) => {
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
})*/

// Get all task of a profile
app.get('/tasks/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const author = { author: id, active: true }
  // const shared = { sharedWith: id }


  Task.find(author).exec( (err, tasksDB) => {
  // Task.find( {$and: [author, shared]} ).exec( (err, tasksDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access task list.',
        err
      })
    }

    if (!tasksDB) {
      return res.status(404).json({
        status: 'error',
        message: 'Task list not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Task list found correctly.',
      tasks: tasksDB
    })
  })
})

// Remove/disable a task
app.delete('/remove-task/:taskId', authenticate, (req, res) => {
  const id = req.params.taskId

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const disabled = { active: false }  

  Task.findByIdAndUpdate(id, disabled, { new: true }, (err, disabledTask) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error removing the task.',
        err
      })
    }

    if (!disabledTask) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Task removed correctly.',
      task: disabledTask
    })
  })
})


module.exports = app