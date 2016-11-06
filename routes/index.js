const express = require('express')
const usersRoutes = require('./users')
const authRoutes = require('./auth')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

// mount user routes at /users
router.use('/users', usersRoutes)

// mount auth routes at /auth
router.use('/auth', authRoutes)

module.exports = router
