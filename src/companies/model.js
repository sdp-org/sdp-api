const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const companySchema = new Schema({
	/**
	 * Name of the company. It is unique
	 */
	name: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	},
	creationDate: {
		type: Date,
		default: new Date()
	},
	modifyDate: {
		type: Date,
		default: new Date()
	}
});

companySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		return {
			id: returnedObject._id,
			name: returnedObject.name,
		};
	}
});

const Company = model('companies', companySchema);

module.exports = Company;
