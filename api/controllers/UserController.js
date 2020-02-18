'use strict'

import UserService from '../services/UserService'
import * as auth from '../utils/auth'
export default class UserController {
  static async registerUser(req, res) {
    const username = req.body.username
    const password = req.body.password

    const checkUser = await UserService.getOne({ username })

    if (checkUser) {
      return res.send('User with such username already exists.')
    }

    const user = await UserService.create(username, password)
    const token = auth.signToken(user.id)

    res.status(200).send({ auth: true, token, message: 'User Registered!' })
  }

  static async loginUser(req, res) {
    const username = req.body.username
    const password = req.body.password
    const user = await UserService.getOne({ username })

    const checkPassword = await UserService.checkPassword(user, password)
    console.log(checkPassword)
    const token = auth.signToken(user.id)

    if (checkPassword) {
      return res
        .status(200)
        .send({ auth: true, token, message: 'User Authenticated! ' })
    } else {
      return res
        .status(403)
        .send({ auth: false, message: 'Password authentication failed!' })
    }
  }

  static async logoutUser(req, res) {
    res.status(200).send({ auth: false, token: null })
  }
}
