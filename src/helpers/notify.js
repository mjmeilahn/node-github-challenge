const chalk = require('chalk')
const log = require('./log')

module.exports = async function(limit, remain) {
  log(`\nRemaining API calls: ${remain}`)

  let remaining = parseInt(remain, 0)
  let difference = (remaining / limit * 100)
  let decimal = Math.abs(difference - 100)
  let percent = decimal.toFixed(2)
  let msg = `API calls are at ${percent}% capacity\n`

  if (percent >= 90) {
    log(chalk.red(msg))
  } else if (percent >= 75) {
    log(chalk.yellow(msg))
  } else if (percent >= 50) {
    log(chalk.magenta(msg))
  } else if (percent >= 25) {
    log(chalk.blue(msg))
  } else {
    log(chalk.green(msg))
  }
}
