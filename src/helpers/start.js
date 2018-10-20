/*
  Synchronous lifecycle of application

  1. Initialize Progress Bar
  2. Fetching Comments
  3. Printing Report
*/

const comments = require('./comments')
const events = require('../events')
const report = require('./report')

module.exports = async function(repo, isoString) {
  // 1. Init progress bar
  events('begin')

  // 2. Fetch comments
  const data = await comments(repo, isoString)

  // 3. Print report
  await report(data)
}
