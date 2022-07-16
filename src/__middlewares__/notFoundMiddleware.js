module.exports = (req, res, next) => {
  res.status(404)
      .json({ 
        error: true,
        message: `Resource not found. The path ${req.path} does not exist in the API.`,
      })
      .end()
}