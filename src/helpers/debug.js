/*
  To test one set of user data, swap out the "login"
  variable in the equality of "i.login === login"
  with the string of the user's login

  Ex: 'randomUser'
*/

const res = require('./response')

module.exports = function(init, login, comments, issues, pulls, stats, uniq) {
  if (init === true) {
    console.log('-----')

    comments.map(i => {
      if (i.login === login) {
        res(i)
      }
    })

    issues.map(i => {
      if (i.login === login) {
        res(i)
      }
    })

    pulls.map(i => {
      if (i.login === login) {
        res(i)
      }
    })

    stats.map(i => {
      if (i.login === login) {
        res(i)
      }
    })

    uniq.map(i => {
      if (i.login === login) {
        console.log('')
        res('COMBINED DATA IS ...')
        res(i)
        console.log('')
      }
    })
  }
}
