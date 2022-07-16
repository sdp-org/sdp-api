const bcrypt = require('bcrypt');

const saltRound = 10
const hash = (value) =>
  value && bcrypt.hash(value, saltRound)

module.exports = {
  hash,
}