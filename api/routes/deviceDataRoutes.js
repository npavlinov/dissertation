'use strict'

import { Router } from 'express'
import { verifyToken } from '../utils/auth'
import DeviceDataController from '../controllers/DeviceDataController'

const router = new Router()

router.get('/api/data/:id', verifyToken, DeviceDataController.getOne)
router.get('/api/data/:limit?', verifyToken, DeviceDataController.getAll)

export default router
