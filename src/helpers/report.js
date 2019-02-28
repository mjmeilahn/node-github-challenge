const events = require('../events')
const leftPad = require('left-pad')
const log = require('./log')

module.exports = async function(users) {
  events('15%')
  events('done')

  // Log empty lines for readability
  log('')
  log('')

  // Print to command line
  const spaces = users[0].comments.toString().length

  users.map(user => {
    let comments = leftPad(user.comments.toString(), spaces)
    let login = user.login
    let commits = user.total

    log(`${comments} comments, ${login} (${commits} commits)`)
  })
}
