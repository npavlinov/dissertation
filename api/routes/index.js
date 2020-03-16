import { Router } from 'express'
import userRoutes from './userRoutes'
import deviceRoutes from './deviceRoutes'
const router = new Router()

router.use(userRoutes)
router.use(deviceRoutes)

export default router
