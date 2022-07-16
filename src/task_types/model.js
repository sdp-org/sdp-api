const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskTypeSchema = Schema({
	/**
   * Name of the task type
   */
	name: {
		type: String,
		required: true
	},
	/**
   * Admin can write an observation for warn the operator
   */
	observation: {
		type: String,
		default: null
	},
	/**
   * Admin can write an estimated time to do the task (per unit & in minutes)
   */
	estimatedTime: {
		type: Number,
		default: 0
	},
	/**
   * Time per unit and in minutes. Calculated as an average of 
   * all timeused task grouped by taskType of HistoryTasks 
   */
	calculatedTime: {
		type: Number,
		default: 0
	},
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

taskTypeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		return {
			id: returnedObject._id,
			name: returnedObject.name,
			observation: returnedObject.observation,
			estimatedTime: returnedObject.estimatedTime,
			calculatedTime: returnedObject.calculatedTime
		};
	}
});

const TaskTypeModel = model('taskTypes', taskTypeSchema);

module.exports = TaskTypeModel;
