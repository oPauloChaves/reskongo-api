const express = require('express')
const usersRoutes = require('./users')
const authRoutes = require('./auth')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/', (req, res) =>
  res.send('API is running')
)

// mount user routes at /users
router.use('/users', usersRoutes)

// mount auth routes at /auth
router.use('/auth', authRoutes)

module.exports = router
