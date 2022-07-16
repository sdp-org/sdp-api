const express = require('express');
const router = express.Router();
const Service = require('./service');

router.get('/', (req, res) => {
	const { query } = req;
	Service.find(query)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/:id', (req, res) => {
  const { params, query } = req;
	const { id } = params;
	Service.findById({ id, ...query })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(404).send({ error: err.message });
    });
});

router.post('/', (req, res) => {
	const user = req.body;
	Service.create(user)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
})

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;
  Service.update(id, user)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Service.delete(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
});

module.exports = router;
