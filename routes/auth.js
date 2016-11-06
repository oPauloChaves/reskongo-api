const express = require('express')
const expressJwt = require('express-jwt')
const authCtrl = require('../controllers/auth')
const config = require('../config')

const router = express.Router();

router.route('/login')
  .post(authCtrl.login)

router.route('/random-numer')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber)

module.exports = router
