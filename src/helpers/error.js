const chalk = require('chalk')

module.exports = function(message) {
  console.error('\n' + chalk.yellow(message))
}
