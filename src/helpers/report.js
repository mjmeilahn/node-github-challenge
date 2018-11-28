const events = require('../events')
const leftPad = require('left-pad')
const log = require('./log')

module.exports = async function(users) {
  await events('15%')
  events('done')

  // Log empty lines for readability
  log('')
  log('')

  // Since users are sorted by most-to-least comments,
  // set spaces to how many digits of first number
  const spaces = users[0].comments.toString().length

  // Print to command line
  users.map(user => {
    let comments = leftPad(user.comments.toString(), spaces)
    let login = user.login
    let commits = user.total

    log(`${comments} comments, ${login} (${commits} commits)`)
  })
}
