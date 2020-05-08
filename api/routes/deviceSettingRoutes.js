'use strict'

import { Router } from 'express'
import { verifyToken } from '../utils/auth'
import DeviceSettingsController from '../controllers/DeviceSettingsController'

const router = new Router()

router.get('/api/settings/:id', verifyToken, DeviceSettingsController.getOne)
router.get('/api/settings', verifyToken, DeviceSettingsController.getAll)
router.post('/api/settings', verifyToken, DeviceSettingsController.create)
router.patch('/api/settings/:id', verifyToken, DeviceSettingsController.update)
router.delete(
  '/api/settings/:id',
  verifyToken,
  DeviceSettingsController.destroy
)

export default router
