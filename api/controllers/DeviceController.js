'use strict'

import DeviceService from '../services/DeviceService'
/**
 * This class implements a controller for the Devices
 * It will handle all requests made to the routes for
 * managing devices.
 */
export default class DeviceController {
  /**
   * This method creates a device.
   * It takes the required data from the req object
   * and stores it in a deviceData object, which it then
   * sends to the DeviceService Class.
   * @param {Object} req
   * @param {Object} res
   */
  static async create(req, res) {
    const deviceData = {
      name: req.body.name,
      ip: req.body.ip,
      connected: false,
      userId: req.id,
      fetchTime: req.body.fetchTime,
    }
    try {
      await DeviceService.create(deviceData)
      res.status(200).send({ message: 'Device Created!' })
    } catch (err) {
      if ((err.name = 'SequelizeUniqueConstraintError')) {
        res.status(500).send({ message: 'Device with such IP already exists!' })
      }
      throw new Error(err)
    }
  }

  /**
   * This method updates a device.
   * It takes the id of the device it will update through
   * paramaters of the URL and the data that will be changed
   * through the req.body.
   * @param {Object} req
   * @param {Object} res
   */

  static async update(req, res) {
    const deviceId = req.params.id
    try {
      await DeviceService.update(req.body, deviceId)
      res.status(200).send({ message: 'Device Updated!' })
    } catch (err) {
      if ((err.name = 'SequelizeUniqueConstraintError')) {
        res.status(500).send({ message: 'Device with such IP already exists!' })
      }
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }

  /**
   * This method returns all the devices for a particular user.
   * @param {Object} req
   * @param {Object} res
   */
  static async getAll(req, res) {
    try {
      const devices = await DeviceService.getAll({ userId: req.id })
      res.status(200).send(devices)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * This method returns a single device.
   * It gets the id of the device through the parameter of the
   * request URL
   * @param {Object} req
   * @param {Object} res
   */
  static async getOne(req, res) {
    try {
      const device = await DeviceService.getOne({ id: req.params.id })
      res.status(200).send(device)
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * This method deletes a device.
   * It gets the id of the device through the parameter of the
   * request URL
   * @param {Object} req
   * @param {Object} res
   */
  static async destroy(req, res) {
    try {
      await DeviceService.remove(req.params.id)
      const devices = await DeviceService.getAll({ uuserId: req.id })
      res.status(200).send({ devices, message: 'Device Deleted!' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Something went wrong!' })
    }
  }
}
