const mongoose = require('mongoose')
const { Schema, model } = mongoose

const counterSchema = new Schema({
  /**
   * It increments on 1 on each new workorder
   */
  batchNumber: Number
})

const Counters = model('counters', counterSchema)

module.exports = Counters;