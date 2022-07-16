const jwt = require('jsonwebtoken')
const UserService = require('../users/model')
const bearer = 'Bearer'

module.exports = (req, res, next) => {
  let token;
  const authorization = req.get('Authorization')
  
  if (authorization?.startsWith(bearer)){
    token = authorization.substring(7)
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = UserService.findOne(decodedToken.id)
    if (!user) throw Error('Invalid Token')    
    next()
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message,
      name: error.name
    }).end()
  }
}