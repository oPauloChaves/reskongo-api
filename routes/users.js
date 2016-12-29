const express = require('express')
const expressJwt = require('express-jwt')
const usersCtrl = require('../controllers/users')

const router = express.Router()

router.route('/')
  /** GET /api/users - Get list of users */
  .get(expressJwt({ secret: process.env.JWT_SECRET }), usersCtrl.findAll)
  /** POST /api/user - Create a new user */
  .post(usersCtrl.save)

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(usersCtrl.get)

router.param('userId', usersCtrl.findById)

module.exports = router
