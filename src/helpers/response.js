module.exports = async function(value) {
  return await console.dir(value, { colors: true, depth: 4 })
}
