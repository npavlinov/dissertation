import { Router } from 'express'
import userRoutes from './userRoutes'
import deviceRoutes from './deviceRoutes'
import deviceDataRoutes from './deviceDataRoutes'
import deviceSettingRoutes from './deviceSettingRoutes'
import socketRoutes from './socketRoutes'
const router = new Router()

router.use(userRoutes)
router.use(deviceRoutes)
router.use(deviceDataRoutes)
router.use(deviceSettingRoutes)
router.use(socketRoutes)

export default router
