'use strict'
import bcrypt from 'bcrypt'
import { User } from '../database/models'

export default class UserService {
  static async getOne(param) {
    return await User.findOne({
      where: param,
    })
  }

  static async create(data) {
    const hash = await bcrypt.hash(data.password, 10)

    const userParams = {
      ...data,
      password: hash,
    }

    const user = await User.create(userParams)
    return user
  }

  static async checkPassword(user, password) {
    const match = await bcrypt.compare(password, user.password)
    return match
  }
}
