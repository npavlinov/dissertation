'use strict'

import { Router } from 'express'
import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'

const router = new Router()

router.route('/api/auth/register').post(UserController.registerUser)
router.route('/api/auth/login').post(UserController.loginUser)
router.route('/account').get(AuthController.verifyToken)
export default router
