'use strict'
import bcrypt from 'bcrypt'
import { User } from '../database/models'

export default class UserService {
  static async getOne(param) {
    return await User.findOne({
      where: param,
    })
  }

  static async create(username, password) {
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hash })
    return user
  }

  static async checkPassword(user, password) {
    const match = await bcrypt.compare(password, user.password)
    return match
  }
}
