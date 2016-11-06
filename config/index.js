/**
 * Generate secret key: https://www.grc.com/passwords.htm
 */

const path = require('path');

const env = process.env.NODE_ENV || 'development';

const defaultConfig = {
  root: process.cwd(),
  env: 'production',
  jwtSecret: 'xCLjgRFBunBugeTjo2N4BOVkdisHGMmnBfBGrPvqxEFuzD6VWg7trCesdQvEN0w',
  port: 3000,
  db: 'mongodb://localhost/reskongo'
}

const config = {
  production: {},
  development: {
    env: 'development',
    db: 'mongodb://localhost/reskongo-dev'
  },
  test: {
    db: 'mongodb://localhost/reskongo-test',
    env: 'test'
  }
}

module.exports = Object.assign(defaultConfig, config[env]);
