'use strict'

import UserService from '../services/UserService'
import * as auth from '../utils/auth'

/**
 * This class implements a controller for the User model
 * It handles registration and log in by generating a JSON
 * Web Token.
 */
export default class UserController {
  /**
   * This method registers a user. It checks if a user with the same
   * username already exists and if it does, it will not allow the user to be
   * registered. If not, a user will be registered and a JWT issued
   * @param {Object} req
   * @param {Object} res
   */
  static async registerUser(req, res) {
    const { username } = req.body

    const checkUser = await UserService.getOne({ username })

    if (checkUser) {
      return res
        .status(500)
        .send({ message: 'User with such username already exists.' })
    }

    const user = await UserService.create(req.body)
    const token = auth.signToken(user)

    res.status(200).send({ auth: true, token, message: 'User Registered!' })
  }

  /**
   * This method logs in a user. It verifies that the credentials are correct
   * and if so - it signs in a JWT
   * @param {Object} req
   * @param {Object} res
   */
  static async loginUser(req, res) {
    const username = req.body.username
    const password = req.body.password
    const user = await UserService.getOne({ username })

    if (!user) {
      return res.status(403).send({
        auth: false,
        message: 'User with such username does not exist.',
      })
    }

    const checkPassword = await UserService.checkPassword(user, password)
    const token = auth.signToken(user)

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

  /**
   * This method logs out the user
   * @param {Object} req
   * @param {Object} res
   */
  static async logoutUser(req, res) {
    res.status(200).send({ auth: false, token: null })
  }
}
