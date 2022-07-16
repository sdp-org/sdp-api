const mongoose = require('mongoose')
const { Schema, model } = mongoose
const ENUMS = require('../__enums__')

const productSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  mail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  permissions: [{
    type: String,
    enum: ENUMS.PERMISSIONS,
  }],
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
      username: returnedObject.username,
      firstname: returnedObject.firstname,
      lastname: returnedObject.lastname,
      mail: returnedObject.mail,
      phoneNumber: returnedObject.phoneNumber,
      permissions: returnedObject.permissions,
      creationDate: returnedObject.creationDate,
      modifyDate: returnedObject.modifyDate,
    }
  }
})

const Company = model('users', productSchema)

module.exports = Company;