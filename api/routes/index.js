import { Router } from 'express'
import userRoutes from './userRoutes'
const router = new Router()

router.use(userRoutes)

export default router
