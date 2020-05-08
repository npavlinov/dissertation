import { Router } from 'express'
import userRoutes from './userRoutes'
import deviceRoutes from './deviceRoutes'
import deviceDataRoutes from './deviceDataRoutes'
import deviceSettingRoutes from './deviceSettingRoutes'
const router = new Router()

router.use(userRoutes)
router.use(deviceRoutes)
router.use(deviceDataRoutes)
router.use(deviceSettingRoutes)

export default router
