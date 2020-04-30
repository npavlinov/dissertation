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
      if (await DeviceService.checkIp(deviceData)) {
        res.status(500).send({ message: 'Device with such IP already exists!' })
      } else {
        await DeviceService.create(deviceData)
        res.status(200).send({ message: 'Device Created!' })
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  static async update(req, res) {
    const deviceId = req.params.id
    const dataForIpCheck = {
      username: req.username,
      ip: req.body.ip,
    }
    try {
      if (await DeviceService.checkIp(dataForIpCheck)) {
        res.status(500).send({ message: 'Device with such IP already exists!' })
      } else {
        await DeviceService.update(req.body, deviceId)
        res.status(200).send({ message: 'Device Updated!' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }

  static async getAll(req, res) {
    console.log(req.username)
    try {
      const devices = await DeviceService.getAll({ username: req.username })
      res.status(200).send(devices)
    } catch (err) {
      throw new Error(err)
    }
  }

  static async getOne(req, res) {
    try {
      const device = await DeviceService.get(req.params.id)
      res.status(200).send(device)
    } catch (err) {
      throw new Error(err)
    }
  }

  static async destroy(req, res) {
    try {
      await DeviceService.remove(req.params.id)
      const devices = await DeviceService.getAll({ username: req.username })
      res.status(200).send({ devices, message: 'Device Deleted!' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }
}
