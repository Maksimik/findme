'use strict'

import express from 'express'

import thingsController from './thingsController'


const router = express.Router()

router.route('/things').get(thingsController.getAll)
router.route('/thing/:id').get(thingsController.getById)
router.route('/thing/add').post(thingsController.add)
router.route('/thing/update/:id').put(thingsController.update)
router.route('/thing/delete/:id').delete(thingsController.delete)

export default router
