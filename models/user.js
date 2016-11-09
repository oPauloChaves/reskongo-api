const Promise = require('bluebird')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

/**
 * see https://github.com/sahat/hackathon-starter
 */
UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next()
      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword(passwd, cb) {
    console.log(passwd, this)
    bcrypt.compare(passwd, this.password, function(err, isMatch) {
      cb(err, isMatch)
    })
  }
}

UserSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) return user

        let error = new Error('No such user exists!')
        error.status = 404
        return Promise.reject(error)
      })
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
  },

  emailExists(email) {
    return this.findOne({ email })
      .exec()
      .then((user) => {
        if (user) return true

        return false
      })
  },

  getByEmail(email) {
    return this.findOne({ email })
      .exec()
      .then((user) => {
        if (user) return user
        return null
      })
  }
}

module.exports = mongoose.model('User', UserSchema)
