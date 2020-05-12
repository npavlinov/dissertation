import { Device } from '../database/models'

/**
 * This class implements a service for the Device controller
 * The service will perform all operations on the database and if any other
 * controller or service needs to perform CRUD operations on the Device model,
 * it will have to go through this class.
 */
export default class DeviceService {
  /**
   * This method creates a Device entry based on the data provided
   * @param {Object} device
   */
  static async create(device) {
    return await Device.create(device)
  }

  /**
   * This method gets a single Device entry
   * @param {Object} args arguments by which to search the database
   */
  static async getOne(args) {
    return await Device.findOne({
      where: args,
    })
  }

  /**
   * This method gets all Device entries based on the arguments provided
   * @param {Object} args
   */
  static async getAll(args) {
    return await Device.findAll({
      where: args,
      order: [['createdAt', 'asc']],
      attributes: ['name', 'ip', 'connected', 'fetchTime', 'id'],
    })
  }

  /**
   * This method removes a Device entry
   * @param {Integer} id The device id that will be removed
   */
  static async remove(id) {
    return await Device.destroy({ where: { id } })
  }
  /**
   * This method updates a Device entry
   * @param {Object} device the data that will be updated
   * @param {Integer} id the id of the device that will be updated
   */
  static async update(device, id) {
    return await Device.update(device, { where: { id } })
  }
}
