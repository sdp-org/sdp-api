const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
  /**
   * Name of the product
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * Ref to companyID
   */
  company: { type: Schema.ObjectId, ref: 'companies'},
  /**
   * Flag to know if the user is logically deleted
   */
  active: {
    type: Boolean,
    default: true,
  },
  /**
   * Creation Date
   */
  creationDate: {
    type: Date,
    default: new Date(),
  },
  /**
   * Last modify Date
   */
  modifyDate: {
    type: Date,
    default: new Date(),
  },
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {
      id: returnedObject._id,
      name: returnedObject.name,
      company: returnedObject.company?.name,
    }
  }
})

const ProductModel = model('products', productSchema)

module.exports = ProductModel;