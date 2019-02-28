/*
  Synchronous lifecycle of application

  1. Initialize Progress Bar
  2. Fetching Comments
  3. Printing Benchmarks & Report
*/

const comments = require('./comments')
const events = require('../events')
const log = require('./log')
const prettyHRTime = require('pretty-hrtime')
const report = require('./report')

module.exports = async function(repo, isoString) {

  // 1. Init Progress Bar & Benchmark
  const start = process.hrtime()
  events('begin')

  // 2. Fetch Comments
  const data = await comments(repo, isoString)

  // 3. Print Benchmarks & Report
  const end = process.hrtime(start)
  const words = prettyHRTime(end, {precise:true})
  log('')
  log(words)

  report(data)
}
