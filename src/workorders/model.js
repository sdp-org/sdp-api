const mongoose = require('mongoose')
const { Schema, model } = mongoose
const ENUMS = require('../__enums__')

const workorderSchema = new Schema({
  company: { 
    type: Schema.ObjectId, 
    ref: 'companies', 
    required: true 
  },
  product: { 
    type: Schema.ObjectId, 
    ref: 'products', 
    required: true 
  },
  plan: { 
    type: Schema.ObjectId, 
    ref: 'plans', 
    required: true 
  },
  tasks: [{ 
    type: Schema.ObjectId, 
    ref: 'tasks',
    default: []
  }],
  status: {
    type: String,
    enum : ENUMS.STATUS,
    default: ENUMS.STATUS_DEFAULT,
  },
  quantity: {
    type: Number,
    required: true,
  },
  batchNumber: {
    type: Number,
    required: true,
  },
  observation: {
    type: String,
    default: null
  },
  deliveryDate: {
    type: Date,
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

workorderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {
      id: returnedObject._id,
      company: returnedObject.company?.name,
      product: returnedObject.product?.name,
      plan: returnedObject.plan?.name,
      status: returnedObject.status,
      quantity: returnedObject.quantity,
      batchNumber: returnedObject.batchNumber,
      observation: returnedObject.observation,
      deliveryDate: returnedObject.deliveryDate,
      tasks: returnedObject.tasks,
      modifyDate: returnedObject.modifyDate,
    }
  }
})

const Workorder = model('workorders', workorderSchema)

module.exports = Workorder;