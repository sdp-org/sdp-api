const mongoose = require('mongoose')
const { Schema, model } = mongoose
const ENUMS = require('../__enums__')

const productSchema = new Schema({
  taskType: { 
    type: Schema.ObjectId, 
    ref: 'taskTypes', 
    required: true 
  },
  workorder: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    enum : {
      values: ENUMS.STATUS,
      message: '{VALUE} is not a valid status'
    },
    default: ENUMS.STATUS_DEFAULT,
  },
  done: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
    default: null,
  },
  responsible: {
    type: Schema.ObjectId, 
    ref: 'users', 
    default: null,
  },
  priority: {
    type: Number,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  creationDate: {
      type: Date,
      default: new Date(),
  },
  modifyDate: {
    type: Date,
    default: new Date(),
  },
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {      
      id: returnedObject._id,
      workorder: returnedObject.workorder,
      taskType: returnedObject.taskType?.id,
      name: returnedObject.taskType?.name,
      status: returnedObject.status,
      quantity: returnedObject.quantity,
      observation: returnedObject.taskType?.observation,
      done: returnedObject.done,
      responsible: returnedObject.responsible?.username,
      estimatedTime: returnedObject.taskType?.estimatedTime,
      calculatedTime: returnedObject.taskType?.calculatedTime,
      calculatedTotalTime: returnedObject.taskType?.calculatedTime*returnedObject.quantity,
      comments: returnedObject.comments,
    }
  }
})

const Company = model('tasks', productSchema)

module.exports = Company;