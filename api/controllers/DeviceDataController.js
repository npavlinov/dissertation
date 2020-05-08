'use strict'

import DeviceDataService from '../services/DeviceDataService'

export default class DeviceController {
  static async getAll(req, res) {
    try {
      const data = await DeviceDataService.getAll(
        { username: req.username },
        req.query.limit
      )
      res.status(200).send(data)
    } catch (err) {
      throw new Error(err)
    }
  }

  static async getOne(req, res) {
    try {
      const data = await DeviceDataService.getOne({ id: req.params.id })
      res.status(200).send(data)
    } catch (err) {
      throw new Error(err)
    }
  }
}
