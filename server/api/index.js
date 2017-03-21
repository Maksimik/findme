'use strict'

import express from 'express'

import thingsController from './thingsController'


const router = express.Router()

router.route('/things').get(thingsController.getAll)
router.route('/things/:id').get(thingsController.getById)
router.route('/thing').post(thingsController.add)
router.route('/thing/:id').put(thingsController.update)

export default router
