const express = require('express')
const expressJwt = require('express-jwt')
const config = require('../config')
const usersCtrl = require('../controllers/users')

const router = express.Router()

router.route('/')
  .get(expressJwt({ secret: config.jwtSecret }), usersCtrl.findAll)

module.exports = router
