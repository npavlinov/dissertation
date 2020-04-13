'use strict'

import DeviceService from '../services/DeviceService'

export default class DeviceController {
  static async create(req, res) {
    try {
      await DeviceService.create(req.body)
      res.status(200).send('Device Created!')
    } catch (err) {
      throw new Error(err)
    }
  }
}
