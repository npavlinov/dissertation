'use strict'
import bcrypt from 'bcrypt'
import { User } from '../database/models'

/**
 * This class implements a service for the User controller
 * The service will perform all operations on the database and if any other
 * controller or service needs to perform CRUD operations on the User model,
 * it will have to go through this class.
 */
export default class UserService {
  /**
   * This method gets a single user based on the parameters of the function
   * @param {Object} param arguments by which to search the database
   */
  static async getOne(param) {
    return await User.findOne({
      where: param,
    })
  }

  /**
   * This method creates a user. It first hashes the provided password
   * and then saves the hashed password in the database along with any other data
   * that is required
   * @param {Object} data
   */
  static async create(data) {
    const hash = await bcrypt.hash(data.password, 10)

    const userParams = {
      ...data,
      password: hash,
    }

    const user = await User.create(userParams)
    return user
  }

  /**
   * This method checks if a hashed password matches a non-hashed password
   * @param {Object} user the user object whose password will be checked against
   * @param {String} password the password to check
   */
  static async checkPassword(user, password) {
    const match = await bcrypt.compare(password, user.password)
    return match
  }
}
