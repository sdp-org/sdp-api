module.exports = (req, res, next) => {
  const { data, error } = res;

  if (error || !data) next()
    
  if (data?.length === 0){
    res.status(204).json(data).end()
  }
  
  res.send(data)
}