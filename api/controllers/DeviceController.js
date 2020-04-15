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

  static async get(req, res) {
    try {
      const devices = await DeviceService.getAll({ username: req.username })
      res.status(200).send(devices)
    } catch (err) {
      throw new Error(err)
    }
  }
}
