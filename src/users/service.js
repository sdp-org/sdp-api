const Repository = require('./repository');
const { hash } = require('./utils');

const Service = {};

Service.find = (query) => Repository.find(query);

Service.findById = async ({ id, ...query }) => {
	const data = await Repository.findById(id, query)
	if (!data) throw Error('User not Found')
	return data;
};

Service.hashData = async (values) => ({
	...values,
	mail: await hash(values.mail),
	phoneNumber: await hash(values.phoneNumber),
	password: await hash(values.password),
	modifyDate: new Date(),
});

Service.validateCreate = async (values) => {
	const { data } = await Repository.find({
		query: { username: values.username },
	});
	if (data.length) throw Error('username already exists');
	const hashedData = await Service.hashData(values);
	return hashedData;
};

Service.validateUpdate = async (id, values) => {
	const { data: idValidation } = await Repository.find({
		query: {
			_id : { $eq: id },
		},
	})
	if (!idValidation.length) throw Error('user does not exists');

	const { data } = await Repository.find({
		query: { 
			_id : { $ne: id },
			username: values.username 
		},
	});
	if (data.length) throw Error('username already exists');

	const hashedData = await Service.hashData(values);
	return hashedData;
};

Service.create = async (values) => {
	try {
		const validUser = await Service.validateCreate(values);
		const data = await Repository.create(validUser);
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
