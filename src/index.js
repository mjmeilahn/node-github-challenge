/*
  1. This file validates CLI input

  2. /helpers/start file lists steps in Application

  3. /helpers/comments combines returned user data

  4. Github folder is where all requests are handled

  5. Events folder is for Progress Bar,
  API Limits, and printed message about API capacitance

  6. /helpers/report prints data to command line
*/

const argv = require('yargs').argv
const chalk = require('chalk')
const error = require('./helpers/error')
const start = require('./helpers/start')
const log = require('./helpers/log')
const type = require('./helpers/type')

// CLI input
const repo = argv.repo
const period = argv.period

// validate "--repo"
if (type.str(repo) && type.repo(repo)) {
  let date = `${chalk.red('from')} the beginning`
  let days = 0
  let message = '\nFetching comments '

  // validate "--period"
  if (type.str(period) && period.includes('d')) {
    days = period.replace(/([d])/g, '')
    date = `${chalk.red('for')} past ${days} days`
  }

  // convert "days" to number
  const time = parseInt(days, 0)
  let isoString = ''

  // convert time to ISO 8601 format
  if (time !== 0) {
    let date = new Date()
    date.setDate(date.getDate() - time)
    isoString = date.toISOString().replace(/(\..*)/g, 'Z')
  }

  // output fetch message
  message += `${date} ${chalk.red('for')} "${repo}"...`
  log(message)

  // start application lifecycle
  start(repo, isoString)
} else {
  error('\nInvalid repo, please try again')
}
