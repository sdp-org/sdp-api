const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString)
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database Error"))
