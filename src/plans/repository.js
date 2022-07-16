const Model = require('./model');

const Repository = {};

Repository.find = ({ query, fields, sort, asc, limit, page }) =>
	new Promise((resolve, reject) => {
		Model.find(query, fields, { sort: { [sort]: asc } })
			.populate({
				path: 'product',
				populate: [ { path: 'name' }, { path: 'company' } ]
			})
			.limit(limit)
			.skip(limit * (page - 1))
			.exec(function(err, data) {
				if (err) reject(err);
				Model.count(query).exec(function(err, count) {
					if (err) reject(err);
					resolve({
						total: Number(count),
						page: Number(page),
						pages: Math.ceil(count / limit),
						data
					});
				});
			});
	});

Repository.findById = (id, query) =>
	new Promise((resolve, reject) => {
		Model.findById(id)
			.populate({
				path: 'product',
				populate: [ { path: 'name' }, { path: 'company' } ]
			})
			.populate('tasks')
			.then((plan) => {
				if (!plan) resolve(plan);
				plan._doc.estimatedTime =
					plan.tasks.reduce((acc, task) => acc + task.estimatedTime, 0) / plan.tasks.length;
				plan._doc.calculatedTime =
					plan.tasks.reduce((acc, task) => acc + task.calculatedTime, 0) / plan.tasks.length;
				resolve(plan);
			})
			.catch((err) => reject(err));
	});

Repository.create = (values) =>
	new Promise((resolve, reject) => {
		const newUser = new Model(values);
		newUser.save().then((data) => resolve(data)).catch((err) => reject(err));
	});

Repository.update = (id, values) =>
	new Promise((resolve, reject) => {
		Model.findByIdAndUpdate(id, values, { new: true, runValidators: true })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

Repository.delete = (id) =>
	new Promise((resolve, reject) => {
		Model.deleteOne({ _id: id }).then((data) => resolve(data)).catch((err) => reject(err));
	});

module.exports = Repository;
