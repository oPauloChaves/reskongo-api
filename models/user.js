const mongoose = require('mongoose')
const passwd = require('../utils/password')
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
    type: Schema.Types.Mixed,
    required: true
  }
  // projects: [Schema.Types.ObjectId]
}, { timestamps: true })

/**
 * see https://github.com/sahat/hackathon-starter
 */
UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  const saltHash = passwd.saltHashPassword(user.password)
  user.password = saltHash
  next()
})

UserSchema.methods = {
  comparePassword (candidatePassword, cb) {
    const isMatch = passwd.comparePassword(candidatePassword, this.password)
    cb(null, isMatch)
  }
}

UserSchema.statics = {

  get (id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) return user

        let error = new Error('No such user exists!')
        error.status = 404
        return global.Promise.reject(error)
      })
  },

  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
  },

  emailExists (email) {
    return this.findOne({ email })
      .exec()
      .then((user) => {
        if (user) return true

        return false
      })
  },

  getByEmail (email) {
    return this.findOne({ email })
      .exec()
      .then((user) => {
        if (user) return user
        return null
      })
  }
}

module.exports = mongoose.model('User', UserSchema)
