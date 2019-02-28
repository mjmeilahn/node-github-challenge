/*
  Events cover the Progress Bar & API notification
*/

const _cliProgress = require('cli-progress')
const Emitter = require('events')
const emtr = new Emitter()
const log = require('../helpers/log')
const notify = require('../helpers/notify')
const prettyHRTime = require('pretty-hrtime')

// Benchmark
let start;

// Progress Bar
const bar = new _cliProgress.Bar({}, _cliProgress.Presets.legacy)

// Initial API limits
let limit = 5000
let remaining = 5000

emtr.on('begin', () => {

  // Begin Benchmark
  start = process.hrtime()

  // Instantiate Progress bar
  log('')
  bar.start(100, 0)
  bar.increment(25)
})

emtr.on('15%', () => {
  bar.increment(15)
})

emtr.on('request', api => {
  // API Info updates throughout application
  // eventually will be printed to command line
  limit = api[0]
  remaining = api[1]
})

emtr.on('done', () => {
  bar.stop()

  // End Benchmark
  const end = process.hrtime(start)
  const words = prettyHRTime(end, {precise:true})

  // Print API capacities to CLI
  setTimeout(function() {
    notify(limit, remaining, words)
  }, 1000)
})

module.exports = async function(event, ...args) {
  return emtr.emit(event, ...args)
}
