'use strict'

import express from 'express'

import thingsController from './thingsController'
import usersController from './usersController'


const router = express.Router()

router.route('/things/:userId').get(thingsController.getAll)
router.route('/thing/:id').get(thingsController.getById)
// router.route('/thing/qr-image/:hash').get(thingsController.getImage)
router.route('/thing/add').post(thingsController.add)
router.route('/thing/update/:id').put(thingsController.update)
router.route('/thing/delete/:id').delete(thingsController.delete)

router.route('/user/:id').get(usersController.get)
router.route('/user/update/:id').put(usersController.update)


export default router
