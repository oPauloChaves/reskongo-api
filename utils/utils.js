const jwt = require('jsonwebtoken')

function jwtSign (user, expiresIn = '7d') {
  const token = jwt.sign({
    id: user._id,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn
  })
  return token
}

module.exports = {
  jwtSign
}
