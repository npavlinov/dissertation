'use strict'

import { Router } from 'express'
import { verifyToken } from '../utils/auth'
import DeviceController from '../controllers/DeviceController'

const router = new Router()

router.route('/api/devices/').post(DeviceController.create)
router.get('/api/devices/user', verifyToken, DeviceController.get)

export default router
