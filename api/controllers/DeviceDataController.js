'use strict'

import DeviceDataService from '../services/DeviceDataService'

/**
 * This class implements a controller class for the DeviceData
 * It consists only of getAll and getOne functions, since all other
 * operations are handled only by the back-end and the user will not be able to
 * perform manipulations on the data
 */
export default class DeviceDataController {
  /**
   * This method gets all data for a particular device and for a particular user
   * @param {Object} req
   * @param {Object} res
   */
  static async getAll(req, res) {
    try {
      const data = await DeviceDataService.getAll(
        { userId: req.id },
        req.query.limit,
        req.query.order
      )
      res.status(200).send(data)
    } catch (err) {
      throw new Error(err)
    }
  }
  /**
   * This method gets a single data entry
   * @param {Object} req
   * @param {Object} res
   */
  static async getOne(req, res) {
    try {
      const data = await DeviceDataService.getOne({ id: req.params.id })
      res.status(200).send(data)
    } catch (err) {
      throw new Error(err)
    }
  }
}
