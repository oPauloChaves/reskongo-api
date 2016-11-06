function findAll(req, res, next) {
  return res.json({ users: [] })
}

module.exports = { findAll }
