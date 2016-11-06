const jwt = require('jsonwebtoken')
const config = require('../config')

const user = {
  username: 'paulo',
  password: 'express'
}

function login(req, res, next) {
  if (req.body.username === user.username && req.body.password === user.password) {
    const token = jwt.sign({
      username: user.username
    }, config.jwtSecret);
    return res.json({
      token,
      username: user.username
    })
  }

  var err = new Error('Authentication error')
  err.status = 401
  next(err)
}

function getRandomNumber(req, res) {
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber }
