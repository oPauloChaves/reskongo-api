const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const expect = require('chai').expect
const sinon = require('sinon')

const User = require('../../models/user')

describe('User', function () {
  it('should be invalid if name is empty', function (done) {
    const u = new User()
    u.validate(function (err) {
      expect(err.errors.name).to.exist
      done()
    })
  })
})
