'use strict'

import DeviceSettingsService from '../services/DeviceSettingsService'

export default class DeviceController {
  static async create(req, res) {
    const settingData = {
      deviceId: req.body.deviceId,
      message: req.body.message,
    }
    try {
      await DeviceSettingsService.create(settingData)
      res.status(200).send({ message: 'Setting Created!' })
    } catch (err) {
      throw new Error(err)
    }
  }

  static async update(req, res) {
    const deviceId = req.params.id
    try {
      await DeviceSettingsService.update(req.body, deviceId)
      res.status(200).send({ message: 'Setting Updated!' })
    } catch (err) {
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }

  static async getAll(req, res) {
    try {
      const settings = await DeviceSettingsService.getAll({
        username: req.username,
      })
      res.status(200).send(settings)
    } catch (err) {
      throw new Error(err)
    }
  }

  static async getOne(req, res) {
    try {
      const setting = await DeviceSettingsService.getOne({ id: req.params.id })
      res.status(200).send(setting)
    } catch (err) {
      throw new Error(err)
    }
  }

  static async destroy(req, res) {
    try {
      await DeviceSettingsService.remove(req.params.id)
      const settings = await DeviceSettingsService.getAll({
        username: req.username,
      })
      res.status(200).send({ settings, message: 'Device Deleted!' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }
}
