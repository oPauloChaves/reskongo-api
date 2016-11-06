const express = require('express')
const expressJwt = require('express-jwt')
const authCtrl = require('../controllers/auth')
const config = require('../config')

const router = express.Router();

router.route('/login')
  .post(authCtrl.login)

module.exports = router
