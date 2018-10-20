/*
  I customize this file often to recognize
  custom data like a phone number, zip code, etc.
*/

const type = {}

type.str = str => {
  return typeof str === 'string' ? true : false
}

type.num = num => {
  return typeof num === 'number' ? true : false
}

type.bool = bool => {
  return typeof bool === 'boolean' ? true : false
}

type.obj = obj => {
  return typeof obj === 'object' ? true : false
}

type.repo = str => {
  return str.match(/(\w)|(\/)|(-)/g) ? true : false
}

module.exports = type
