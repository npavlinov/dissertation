'use strict'

import DeviceService from '../services/DeviceService'

export default class DeviceController {
  static async create(req, res) {
    const deviceData = {
      name: req.body.name,
      ip: req.body.ip,
      connected: false,
      username: req.username,
      fetchTime: req.body.fetchTime,
    }
    try {
      await DeviceService.create(deviceData)
      res.status(200).send({ message: 'Device Created!' })
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
