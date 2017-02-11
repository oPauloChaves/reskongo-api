const jwt = require('jsonwebtoken')
const User = require('../models/user')

function login (req, res, next) {
  const reqUser = {
    email: req.body.email,
    password: req.body.password
  }

  User.getByEmail(reqUser.email)
    .then((user) => {
      if (!user) {
        let error = new Error(`Email ${reqUser.email} not found.`)
        error.status = 422
        return next(error)
      }

      user.comparePassword(reqUser.password, (err, isMatch) => {
        if (err) {
          return next(err)
        }
        if (!isMatch) {
          let error = new Error(`Invalid email or password`)
          error.status = 401
          return next(error)
        }

        const token = jwt.sign({
          id: user._id,
          email: user.email
        }, process.env.JWT_SECRET)

        return res.json({
          token,
          email: user.email
        })
      })
    })
    .catch(e => next(e))
}

module.exports = { login }
