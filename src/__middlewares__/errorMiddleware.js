module.exports = (req, res, next) => {
  const { error } = res;
  if (!error) {
    next()
  }
  res.send({ 
    error: true,
    message: error?.message,
    name: error?.name
  })
}