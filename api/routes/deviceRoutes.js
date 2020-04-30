'use strict'

import { Router } from 'express'
import { verifyToken } from '../utils/auth'
import DeviceController from '../controllers/DeviceController'

const router = new Router()

router.get('/api/devices/:id', verifyToken, DeviceController.getOne)
router.get('/api/devices', verifyToken, DeviceController.getAll)
router.post('/api/devices', verifyToken, DeviceController.create)
router.patch('/api/devices/:id', verifyToken, DeviceController.update)
router.delete('/api/devices/:id', verifyToken, DeviceController.destroy)

export default router
