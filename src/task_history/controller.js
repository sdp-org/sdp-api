const express = require('express');
const router = express.Router();
const TaskHistory = require('./model')

router.get('/', (req, res, next) => {
  const query = req.query || {}
  const sortBy = req.query.sort || 'timestamp'
  const asc = req.query.asc || -1
  const { limit, page, fields } = req.query
	TaskHistory.find(query, fields, { sort: { [sortBy]: asc } })
    .populate('taskType')
    .populate('responsible')
		.limit(limit)
		.skip(limit * (page - 1))
		.exec(function(err, data) {
      if (err) {
        res.error = err
        next()
      }
			TaskHistory.count(query).exec(function(err, count) {
				res.send({
          data,
					total: Number(count),
					page: Number(page),
					pages: Math.ceil(count / limit)
				});
			});
		})
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  TaskHistory
    .findById(id)
    .populate('taskType')
    .populate('responsible')
    .then( result => res.json(result).send())
    .catch( err => res.send(err.message))
});

router.post('/massive', (req, res, next) => {
  const { body } = req
  TaskHistory
    .insertMany(body) 
    .then(result => res.json(result).send())
    .catch(err => res.send(err))
});

module.exports = router;
