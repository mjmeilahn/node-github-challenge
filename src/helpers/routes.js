/*
  My thinking was to fetch as much data
  per call to avoid extra fetching
  hence the 100 results per page.
*/

let route = {}

route.comments = '/comments?page=1&per_page=100'
route.issues = '/issues/comments?page=1&per_page=100'
route.pulls = '/pulls/comments?page=1&per_page=100'
route.stats = '/stats/contributors'

module.exports = route
