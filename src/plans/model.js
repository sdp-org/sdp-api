const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const planSchema = new Schema({
	/**
   * Name of the Plan
   */
	name: {
		type: String,
		required: true
	},
	/**
   * Ref to productID
   */
	product: {
		type: Schema.ObjectId,
		ref: 'products',
		required: true
	},
	/**
   * Ref to tasksID
   */
	tasks: [
		{
			type: Schema.ObjectId,
			ref: 'taskTypes',
			default: []
		}
	],
	/**
   * Flag to know if the user is logically deleted
   */
	active: {
		type: Boolean,
		default: true
	},
	/**
   * Creation Date
   */
	creationDate: {
		type: Date,
		default: new Date()
	},
	/**
   * Last modify Date
   */
	modifyDate: {
		type: Date,
		default: new Date()
	}
});

planSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		return {
			id: returnedObject._id,
			name: returnedObject.name,
			product: returnedObject.product?.name,
			company: returnedObject.product?.company,
			tasks: returnedObject.tasks,
			estimatedTime: returnedObject.estimatedTime,
			calculatedTime: returnedObject.calculatedTime
		};
	}
});

const PlanModel = model('plans', planSchema);

module.exports = PlanModel;
