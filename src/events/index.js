/*
  Events cover the Progress Bar & API notification
*/

const _cliProgress = require('cli-progress')
const Emitter = require('events')
const emtr = new Emitter()
const log = require('../helpers/log')
const notify = require('../helpers/notify')

// Progress Bar
const bar = new _cliProgress.Bar({}, _cliProgress.Presets.legacy)

// Initial API limits
let limit = 5000
let remaining = 5000

emtr.on('begin', () => {
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

  // Print API capacities to CLI
  setTimeout(function() {
    notify(limit, remaining)
  }, 1000)
})

module.exports = async function(event, ...args) {
  return emtr.emit(event, ...args)
}
