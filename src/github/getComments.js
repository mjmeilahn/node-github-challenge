const error = require('../helpers/error')
const stacktrace = require('../helpers/stacktrace')

module.exports = async function(logins) {
  const comments = []
  const uniqueLogins = []

  try {
    // Create unique array of logins & JSON template
    await logins.map(login => {
      if (!uniqueLogins.includes(login)) {
        uniqueLogins.push(login)

        // Create JSON schema template
        comments.push({
          login: login,
          comments: 0,
          total: 0,
        })
      }
    })

    // Map all logins to unique JSON schema
    await logins.map(login => {
      uniqueLogins.map(unique => {
        if (login === unique) {
          let index = comments.findIndex(comment => comment.login === unique)
          comments[index]['comments'] += 1
        }
      })
    })

    return comments
  } catch (e) {
    error(e)
    stacktrace(e)
  }
}
