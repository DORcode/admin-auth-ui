'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const testEnv = require('./test.env')

module.exports = merge(prodEnv, testEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  VUE_APP_BASE_API:'"/api"',
  VUE_APP_SERVICE_URL: ''
})