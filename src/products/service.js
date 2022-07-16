const Repository = require('./repository');
const Companies = require('../companies/repository');

const Service = {};

Service.find = (query) => Repository.find(query);

Service.findById = async ({ id, ...query }) => {
	const data = await Repository.findById(id, query)
	if (!data) throw Error('Product Not Found')
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
		query: { name: values.name },
	});
	if (data.length) throw Error('name already exists');
	
	const { data: companyExist } = await Companies.find({
		query: { _id: values.company },
	});
	if (!companyExist.length) throw Error('company does not exists');

	return values;
};

Service.validateUpdate = async (id, values) => {
	const { data: idValidation } = await Repository.find({
		query: { _id: id },
	});
	if (!idValidation.length) throw Error('product does not exists');

	const { data } = await Repository.find({
		query: { 
			_id : { $ne: id },
			name: values.name,
			company: values.company,
		},
	});
	if (data.length) throw Error('name already exists');

	const { data: companyExist } = await Companies.find({
		query: { _id: values.company },
	});
	if (!companyExist.length) throw Error('company does not exists');

	return values;
};

Service.create = async (values) => {
	try {
		const validData = await Service.validateCreate(values);
		const data = await Repository.create(validData);
		return data;
	} catch (error) {
		throw error		
	}
};

Service.update = async (id, values) => {
	try {
		const validData = await Service.validateUpdate(id, values);
		const data = await Repository.update(id, validData);
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
