import { Router } from 'express'
import userRoutes from './userRoutes'
import deviceRoutes from './deviceRoutes'
import deviceDataRoutes from './deviceDataRoutes'
const router = new Router()

router.use(userRoutes)
router.use(deviceRoutes)
router.use(deviceDataRoutes)

export default router
