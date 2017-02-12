const express = require('express')
const expressJwt = require('express-jwt')
const projectsCtrl = require('../controllers/projects')
const tasksCtrl = require('../controllers/tasks')

const router = express.Router()
const secret = process.env.JWT_SECRET

router.route('/')
  /** GET /api/projects - Get a list of projects */
  .get(expressJwt({ secret }), projectsCtrl.findByOwnerId)
  /** POST /api/projects - Create a new project */
  .post(expressJwt({ secret }), projectsCtrl.save)

router.route('/:projectId')
  /** GET /api/projects/:projectId - Get a project */
  .get(expressJwt({ secret }), projectsCtrl.findById)

router.route('/:projectId/tasks')
  .post(expressJwt({ secret }), tasksCtrl.save)

module.exports = router
