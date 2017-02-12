// const Project = require('../models/project')
const Task = require('../models/task')

function findProjectTasks (req, res, next) {
  Task.findProjectTasks(req.params.projectId, req.user.id)
    .then(tasks => res.json(tasks))
    .catch(err => next(err))
}

/**
 * Add a task to a project.
 *
 * CHECK: To add a task a user has to be the projects owner or
 * a member with write permission
 */
function save (req, res, next) {
  const task = new Task({
    title: req.body.title,
    text: req.body.text,
    listId: req.body.listId,
    projectId: req.params.projectId,
    createdBy: req.user.id
  })

  task.save((err, task) => {
    if (err) return next(err)

    return res.json(task)
  })
}

module.exports = { findProjectTasks, save }
