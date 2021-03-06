const error = require('../helpers/error')
const events = require('../events')
const get = require('../helpers/get')
const getComments = require('./getComments')
const github = {}
const checkHeaders = require('./headers')
const stacktrace = require('../helpers/stacktrace')

github.comments = async function(route, since) {
  let logins = []
  let comments = []
  let firstLogins = []
  let remainingLogins = []
  const date = new Date(since)

  try {
    const json = await get(route)

    // Regardless if we have JSON,
    // update progress bar to indicate app lifecycle
    events('15%')

    // If we have a response
    if (json.statusText === 'OK') {
      const headers = json.headers

      // Fetch last page and reverse
      remainingLogins = await checkHeaders(headers, 'continuous', date)

      // Add results to logins array
      if (remainingLogins) {
        logins = [...remainingLogins]
      }

      // Filter first request by Date/Time
      await json.data.map(stats => {
        let fetchDate = new Date(stats.created_at)
        if (fetchDate > date) {
          if (stats.user['login']) {
            firstLogins.push(stats.user['login'])
          }
        }
      })

      // Merge all logins into array
      logins = [...logins, ...firstLogins]

      // Count how many logins in array as a comment
      comments = await getComments(logins)
    }

    return comments
  } catch (e) {
    error(e)
    stacktrace(e)
  }
}

github.since = async function(route) {
  let logins = []
  let comments = []
  let firstLogins = []
  let remainingLogins = []

  try {
    const json = await get(route)

    // Regardless if we have JSON,
    // update progress bar to indicate app lifecycle
    events('15%')

    // If we have a response
    if (json.statusText === 'OK') {
      const headers = json.headers
      remainingLogins = await checkHeaders(headers, 'since', false)

      // Add results to logins array
      if (remainingLogins) {
        logins = [...remainingLogins]
      }

      await json.data.map(stats => {
        if (stats.user['login']) {
          firstLogins.push(stats.user['login'])
        }
      })

      // Merge all logins into one array
      logins = [...logins, ...firstLogins]

      // Count how many logins in array as a comment
      comments = await getComments(logins)
    }

    return comments
  } catch (e) {
    error(e)
    stacktrace(e)
  }
}

github.stats = async function(route) {
  const totals = []

  try {
    const json = await get(route)

    // Regardless if we have JSON
    // update progress bar to indicate app lifecycle
    events('15%')

    // If we have a response
    if (json.statusText === 'OK') {
      // Create JSON schema template
      await json.data.map(stats => {
        if (stats.author['login']) {
          totals.push({
            login: stats.author['login'],
            comments: 0,
            total: stats.total,
          })
        }
      })
    }

    return totals
  } catch (e) {
    error(e)
    stacktrace(e)
  }
}

module.exports = github
