const User = require('../models/user')

function get(req, res) {
  return res.json(req.user);
}

/**
 * Load an user given his ID and append him to the request
 */
function findById(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get user list
 */
function findAll(req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e))
}

module.exports = { findById, get, findAll }
