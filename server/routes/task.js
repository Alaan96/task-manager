const express = require('express')
const _ = require('underscore')

const Task = require('../models/task')
const { authenticate } = require('../middlewares/authentication')

const app = express()

// Get all task of a profile
app.get('/tasks/:id', authenticate, (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  let query = { author: id }

  const all = req.query.all || false

  if (!all) {
    const active = req.query.active || true
    // const shared = { sharedWith: id }
  
    query = { author: id, active }
  }

  Task.find(query).exec((err, tasksDB) => {
    // Task.find( {$and: [author, shared]} ).exec( (err, tasksDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
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

// Get one task by ID
app.get('/task/:task_id', authenticate, (req, res) => {
  const task_id = req.params.task_id

  if (!task_id) {
    return res.status(400).json({
      status: 'error',
      message: 'Task id is required.'
    })
  }

  Task.findById(task_id, (err, task) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error getting the task.',
        err
      })
    }

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Task getted correctly.',
      task
    })
  })
})

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
  // console.log(body)

  if (!body.title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required.'
    })
  }

  const task = new Task({
    title: body.title,
    description: body.description,
    tag: body.tag,
    author: id,
    date: body.date,
    time: body.time,
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
      message: 'Last task getted correctly.',
      task: lastTask
    })
  })
})

// Update task properties
app.put('/update-task/:task_id', authenticate, (req, res) => {
  const id = req.params.task_id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Task id is required.'
    })
  }

  const fields = ['title', 'description', 'tag', 'time', 'date']

  const data = _.pick(req.body, fields)

  Task.findById(id, (err, taskDB) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to access.',
        err
      })
    }

    if (!taskDB) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.',
      })
    }

    const dataContent = Object.keys(data)
    // console.log(dataContent)
    
    if (dataContent.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'The fields are empty.',
        changes: data,
        task: taskDB
      })
    }
    
    let propertiesForUpdate = []

    // Real fields with different values
    let changes = {}

    dataContent.forEach(property => {
      if (taskDB[property] !== data[property]) {
        // console.log(`${property} has a different value.`)
        propertiesForUpdate.push(property)
        
        changes[property] = data[property] // Set real changes
      } else {
        // console.log(`${property} has the same value.`)
      }
    })


    if (propertiesForUpdate.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No changes detected.',
        data,
        task: taskDB
      })
    }

    propertiesForUpdate.forEach(newProperty => {
      taskDB[newProperty] = data[newProperty]
    })

    taskDB.save((err, taskDB) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Error updating task.',
          err
        })
      }

      if (!taskDB) {
        return res.status(404).json({
          status: 'error',
          message: 'Task not found.',
        })
      }

      return res.json({
        status: 'success',
        message: 'Task updated correctly.',
        changes,
        task: taskDB
      })
    })
  })

  // Task.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' }, (err, taskDB) => {
  //   if (err) {
  //     return res.status(500).json({
  //       status: 'error',
  //       message: 'Unable to update the properties.',
  //       err
  //     })
  //   }
  //   if (!taskDB) {
  //     return res.status(404).json({
  //       status: 'error',
  //       message: 'Task not found.',
  //     })
  //   }

  //   return res.json({
  //     status: 'success',
  //     message: 'Task updated correctly.',
  //     task: taskDB
  //   })
  // })
})

// Disable a task
app.put('/disable-task/:task_id', authenticate, (req, res) => {
  const id = req.params.task_id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const status = { active: false }  

  Task.findByIdAndUpdate(id, status, { new: true }, (err, disabledTask) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error on database.',
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
      message: 'Task disabled correctly.',
      task: disabledTask
    })
  })
})

// Active a task
app.put('/active-task/:task_id', authenticate, (req, res) => {
  const id = req.params.task_id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const status = { active: true }

  Task.findByIdAndUpdate(id, status, { new: true }, (err, disabledTask) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error on database.',
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
      message: 'Task active correctly.',
      task: disabledTask
    })
  })
})

// Remove a task
app.patch('/remove-task/:task_id', authenticate, (req, res) => {
  const id = req.params.task_id

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  Task.findByIdAndRemove(id, (err, deletedTask) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Error removing the task.',
        err
      })
    }

    if (!deletedTask) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      })
    }

    return res.json({
      status: 'success',
      message: 'Task removed correctly.',
      task: deletedTask
    })
  })
})

module.exports = app