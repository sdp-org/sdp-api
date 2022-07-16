const Model = require('./model');

const Repository = {};

Repository.find = ({ query, fields, sort, asc, limit, page }) =>
	new Promise((resolve, reject) => {
		Model.find(query, fields, { sort: { [sort]: asc } })
			.populate('taskType')
			.populate('responsible')
			.limit(limit)
			.skip(limit * (page - 1))
			.exec((err, data) => {
				if (err) reject(err);
				Model.count(query).exec((err, count) => {
					if (err) reject(err);
					resolve({
						total: Number(count),
						page: Number(page),
						pages: Math.ceil(count / limit),
						data,
					});
				});
			});
	});

Repository.findById = (id, query) =>
	new Promise((resolve, reject) => {
		Model.findById(id)
			.populate('taskType')
			.populate('responsible')
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

Repository.create = (values) => 
	new Promise((resolve, reject) => {
		const newTaskType = new Model(values);
		newTaskType.save()
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

Repository.update = (id, values) =>
	new Promise((resolve, reject) => {
		Model.findByIdAndUpdate(id, values, { new: true, runValidators: true })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

Repository.delete = (id) =>
	new Promise((resolve, reject) => {
		Model.deleteOne({ _id: id })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	})


module.exports = Repository;
