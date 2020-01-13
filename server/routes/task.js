const express = require('express')

const Task = require('../models/task')
const { authenticate } = require('../middlewares/authentication')

const app = express()


app.post('/save-task/:id', authenticate, (req, res) => {

  let body = req.body

  console.log(body)

  let params  = req.params

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
    important: body.important,
    urgent: body.urgent,
    time: body.time,
    date: body.date,
    tag: body.tag,
    list: body.list,
    author: params.id
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


// app.get('/task/:id', (req, res) => {
//   let id = req.params.id

//   if (!id) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'ID is required.'
//     })
//   }
  
//   // Define active task property
//   let activeTask = {active: true}
  
//   const user = { id }

//   Task.find({activeTask, user})
//       .exec( (err, tasks) => {
//     if (err) {
//       return res.status(500).json({
//         status: 'error',
//         message: 'Unable to access tasks.',
//         err
//       })
//     }
//     if (!task) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'No tasks found.',
//         err: 'No tasks found.'
//       })
//     }

//     return res.json({
//       status: 'success',
//       message: 'Tasks loaded correctly',
//       tasks
//     })
//   })
// })

// Get all task of a profile
app.get('/tasks/:id', authenticate, (req, res) => {
  let id = req.params.id

  if (!id) {
    return res.status(404).json({
      status: 'error',
      message: 'Id is required.'
    })
  }

  const author = {
    author: id,
    // sharedWith: id
  }

  Task.find(author).exec( (err, tasksDB) => {
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


module.exports = app