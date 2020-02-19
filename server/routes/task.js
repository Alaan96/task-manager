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

  const task = new Task({
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

// Update task properties
app.put('/update-task/:taskId', authenticate, (req, res) => {
  const id = req.params.taskId

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const fields = ['title', 'description', 'tag', 'important', 'urgent', 'date']

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

    dataContent.forEach(property => {
      if (taskDB[property] !== data[property]) {
        // console.log(`${property} has a different value.`)
        propertiesForUpdate.push(property)
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
        changes: data,
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
app.put('/disable-task/:taskId', authenticate, (req, res) => {
  const id = req.params.taskId

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
app.put('/active-task/:taskId', authenticate, (req, res) => {
  const id = req.params.taskId

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
app.delete('/remove-task/:taskId', authenticate, (req, res) => {
  const id = req.params.taskId

  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  Task.findByIdAndRemove(id, (err, disabledTask) => {
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
      // task: disabledTask
    })
  })
})

module.exports = app