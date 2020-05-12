import { DeviceData, Device } from '../database/models'

/**
 * This class implements a service for the DeviceData controller
 * The service will perform all operations on the database and if any other
 * controller or service needs to perform CRUD operations on the DeviceData model,
 * it will have to go through this class.
 */
export default class DeviceDataService {
  /**
   * This method creates a DeviceData entry based on the data provided
   * @param {Object} data
   */
  static async create(data) {
    return await DeviceData.create(data)
  }

  /**
   * This method gets a single DeviceData entry
   * @param {Object} args arguments by which to search the database
   */
  static async getOne(args) {
    return await DeviceData.findOne({
      where: args,
    })
  }

  /**
   * This method gets all data for all devices for a particular user
   * @param {Object} args arguments by which to search the database
   * @param {*} limit the number of entries that should be returned by the query
   * @param {*} order the sorting order based on the createdAt column
   */
  static async getAll(args, limit, order = 'desc') {
    try {
      const devices = await Device.findAll({
        where: args,
      })
      const devicesData = await Promise.all(
        devices.map(async (device) => {
          return device
            .getDeviceData({
              limit: limit || null,
              order: [['createdAt', order]],
              // attributes: ['data'],
              raw: true,
              where: {
                fetchTime: device.fetchTime,
              },
            })
            .map((device) => device.data)
        })
      )
      return devicesData
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * This method removes a DeviceData entry
   * @param {Integer} id The device id that will be removed
   */
  static async remove(id) {
    return await DeviceData.destroy({ where: { id } })
  }

  /**
   * This method updates a DeviceData entry
   * @param {Object} deviceData the data that will be updated
   * @param {Integer} id the id of the device that will be updated
   */
  static async update(deviceData, id) {
    return await DeviceData.update(deviceData, { where: { id } })
  }
}
