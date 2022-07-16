const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../users/model')

router.post('/login', async (req, res) => {
  const { username, password, keepAlive } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.password)
  
  if (!passwordCorrect) {
    res.status(401)
    res.send({ message: 'Invalid user or password' })
    return;
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const options = keepAlive && {
    expiresIn: keepAlive
  }

  const token = await jwt.sign(userForToken, process.env.SECRET, options)

  const adminRedirect = '/admin/usuarios'
  const userRedirect = '/procesos/'
  const redirect = user.permissions.includes('ADMIN') ? adminRedirect : userRedirect

  res.send({ token, user, redirect })
});

module.exports = router;