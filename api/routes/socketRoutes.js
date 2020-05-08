'use strict'

import { Router } from 'express'
import { verifyToken } from '../utils/auth'
import SocketController from '../controllers/SocketController'

const router = new Router()

router.post('/api/sockets', verifyToken, SocketController.sendMessage)

export default router
