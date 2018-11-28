const error = require('./error')
const github = require('../github')
const route = require('./routes')
const stacktrace = require('./stacktrace')
const debug = require('./debug')

module.exports = async function(repo, isoString) {
  let responses = []
  let users = []
  let uniq = []

  // Format ISO String to URL param string
  let since = '&since=' + isoString
  since += '&sort=created&direction=desc'

  try {
    // Fetch all routes asynchronously
    let [comments, issues, pulls, stats] = await Promise.all([
      github.comments(repo + route.comments, isoString),
      github.since(repo + route.issues + since),
      github.since(repo + route.pulls + since),
      github.stats(repo + route.stats),
    ]).catch(e => {
      error(e)
    })

    // If callbacks are not empty,
    // add their contents to generic data wrapper
    if (comments.length) {
      responses.push(comments)
    }

    if (issues.length) {
      responses.push(issues)
    }

    if (pulls.length) {
      responses.push(pulls)
    }

    if (stats.length) {
      await responses.push(stats)
    }

    // Add pages of array objects to one uniform array
    await responses.map(response => {
      response.map(data => {
        users.push(data)
      })
    })

    await users.map(user => {
      if (!uniq.includes(user.login)) {
        uniq.push(user.login)
      }
    })

    // Return combined user data
    await uniq.map((login, i) => {
      users.map(user => {
        // Set first loop values
        let comments = 0
        let total = 0

        if (login === user.login) {
          // Update value if properties exist
          if (uniq[i].comments) {
            comments = uniq[i].comments
          }

          if (uniq[i].total) {
            total = uniq[i].total
          }

          // Return an object in custom mapped array
          uniq[i] = {
            login: login,
            comments: (comments += user.comments),
            total: (total += user.total),
          }

          return uniq[i]
        }
      })
    })

    // Sort by Comments
    let sortedUsers = await uniq.sort((a, b) => b.comments - a.comments)

    // Set first argument to "true" to
    // debug our returned data
    sortedUsers.reverse().map(user => {
      debug(false, user.login, comments, issues, pulls, stats, uniq)
    })

    return sortedUsers
  } catch (e) {
    error(e)
    stacktrace(e)
  }
}
