'use strict'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.json'
import { User } from '../database/models'

export default class UserService {
  static async getOne(username) {
    return await User.findOne({ where: { username } })
  }

  static async create(username, password) {
    const hash = await bcrypt.hash(password, 10)
    const user = User.create({ username, password: hash })
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: 86400,
    })
    return {
      auth: true,
      token,
      message: 'User saved!',
    }
  }

  static async checkPassword(user, password) {
    if (!bcrypt.compareSync(password, user.password)) {
      return { auth: false, token: null }
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: 86400,
    })
    return { auth: true, token }
  }
}
