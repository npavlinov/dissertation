'use strict'

import UserService from '../services/UserService'
import config from '../config/config.json'

export default class UserController {
  static async registerUser(req, res) {
    const username = req.body.username
    const password = req.body.password

    const user = await UserService.getOne(username)

    if (user) {
      return res.send('User with such username already exists.')
    }

    const createRes = await UserService.create(username, password)
    res.status(200).send(createRes.message)
  }

  static async loginUser(req, res) {
    const username = req.body.username
    const password = req.body.password

    const user = await UserService.getOne(username)

    const checkPassword = await UserService.checkPassword(user, password)
    if (checkPassword.auth) {
      return res.status(200).send(checkPassword)
    } else {
      return res.status(403).send(checkPassword)
    }
  }

  static async logoutUser(req, res) {
    res.status(200).send({ auth: false, token: null })
  }
}
