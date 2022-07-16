const express = require('express');
const router = express.Router();
const { authorizationMiddleware } = require('./__middlewares__')

const auth = require('./auth/controller')
const users = require('./users/controller')
const companies = require('./companies/controller')
const products = require('./products/controller')
const plans = require('./plans/controller')
const tasks = require('./tasks/controller')
const taskTypes = require('./task_types/controller')
const taskHistory = require('./task_history/controller')
const workorders = require('./workorders/controller')

router.use('/auth', auth)
router.use('/users', authorizationMiddleware, users)
router.use('/companies', authorizationMiddleware, companies)
router.use('/products', authorizationMiddleware, products)
router.use('/plans', authorizationMiddleware, plans)
router.use('/tasks', authorizationMiddleware, tasks)
router.use('/task_types', authorizationMiddleware, taskTypes)
router.use('/task_history', authorizationMiddleware, taskHistory)
router.use('/workorders', authorizationMiddleware, workorders)

module.exports = router;