const chalk = require('chalk')

module.exports = async function(message) {
  await console.error('\n' + chalk.yellow(message))
}
