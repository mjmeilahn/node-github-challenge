const chalk = require('chalk')
const log = require('./log')

module.exports = async function(limit, remain) {
  await log(`\nRemaining API calls: ${remain}`)

  let remaining = await parseInt(remain, 0)
  let difference = await (remaining / limit * 100)
  let decimal = await Math.abs(difference - 100)
  let percent = await decimal.toFixed(2)
  let msg = `API calls are at ${percent}% capacity\n`

  if (percent >= 90) {
    await log(chalk.red(msg))
  } else if (percent >= 75) {
    await log(chalk.yellow(msg))
  } else if (percent >= 50) {
    await log(chalk.magenta(msg))
  } else if (percent >= 25) {
    await log(chalk.blue(msg))
  } else {
    await log(chalk.green(msg))
  }
}
