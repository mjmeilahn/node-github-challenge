const error = require('./error')
const process = require('process')

module.exports = function() {
  error('You have exceeded the API limit')
  process.exit()
}
