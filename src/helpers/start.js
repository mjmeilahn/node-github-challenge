/*
  Synchronous lifecycle of application

  1. Initialize Progress Bar
  2. Fetching Comments
  3. Printing Benchmarks & Report
*/

const comments = require('./comments')
const events = require('../events')
const report = require('./report')

module.exports = async function(repo, isoString) {

  // 1. Init Progress Bar & Benchmark
  events('begin')

  // 2. Fetch Comments
  const data = await comments(repo, isoString)

  // 3. Print Benchmarks & Report
  report(data)
}
