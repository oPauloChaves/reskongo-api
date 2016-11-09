const express = require('express')
const expressJwt = require('express-jwt')
const config = require('../config')
const usersCtrl = require('../controllers/users')

const router = express.Router()

router.route('/')
  /** GET /api/users - Get list of users */
  .get(expressJwt({ secret: config.jwtSecret }), usersCtrl.findAll)
  /** POST /api/user - Create a new user */
  .post(usersCtrl.save)

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(usersCtrl.get)

router.param('userId', usersCtrl.findById)

module.exports = router
