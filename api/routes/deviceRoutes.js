'use strict'

import { Router } from 'express'
import DeviceController from '../controllers/DeviceController'

const router = new Router()

router.route('/api/devices/').post(DeviceController.create)

export default router
