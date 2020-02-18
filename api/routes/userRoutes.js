'use strict'

import { Router } from 'express'
import UserController from '../controllers/UserController'
import { verifyToken } from '../utils/auth'
import UserService from '../services/UserService'

const router = new Router()

router.route('/api/auth/register').post(UserController.registerUser)
router.route('/api/auth/login').post(UserController.loginUser)
router.get('/profile', verifyToken, async function(req, res, next) {
  const user = await UserService.getOne({ id: req.id })
  user.password = ''
  res.status(200).send(user)
})

export default router
