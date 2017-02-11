const express = require('express')
const expressJwt = require('express-jwt')
const projectsCtrl = require('../controllers/projects')

const router = express.Router()

router.route('/')
  /** GET /api/projects - Get a list of projects */
  .get(expressJwt({ secret: process.env.JWT_SECRET }), projectsCtrl.findByOwnerId)
  /** POST /api/projects - Create a new project */
  .post(expressJwt({ secret: process.env.JWT_SECRET }), projectsCtrl.save)

router.route('/:id')
  /** GET /api/projects/:id - Get a project */
  .get(expressJwt({ secret: process.env.JWT_SECRET }), projectsCtrl.findById)

module.exports = router
