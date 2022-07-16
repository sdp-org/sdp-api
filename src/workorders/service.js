const Repository = require('./repository');
const CounterService = require('../counters/service');

const Service = {};

Service.find = (query) => Repository.find(query);

Service.findById = async ({ id, ...query }) => {
	const data = await Repository.findById(id, query)
	if (!data) throw Error('Workorder Not Found')
	return data;
};


Service.validateCreate = async (values) => {
  const { batchNumber } = await CounterService.findOneAndUpdate({ field: 'batchNumber' })
	const validValues = {
		...values,
		batchNumber,
	}
	return validValues;
};

Service.validateUpdate = async (id, values) => {
	const { data: idValidation } = await Repository.find({
		query: {
			_id : { $eq: id },
		},
	})
	if (!idValidation.length) throw Error('task does not exists');

	// const { data } = await Repository.find({
	// 	query: { 
	// 		_id : { $ne: id },
	// 		name: values.name 
	// 	},
	// });
	// if (data.length) throw Error('name already exists');

	return values;
};

Service.create = async (values) => {
	try {
		const validWorkOrder = await Service.validateCreate(values);
		const data = await Repository.create(validWorkOrder);
		return data;
	} catch (error) {
		throw error		
	}
};

Service.update = async (id, values) => {
	try {
		const validUser = await Service.validateUpdate(id, values);
		const data = await Repository.update(id, validUser);
		return data;
	} catch (error) {
		throw error		
	}
};

Service.delete = async (id) => {
	try {
		const data = await Repository.delete(id);
		return data;
	} catch (error) {
		throw error		
	}
};

module.exports = Service;
