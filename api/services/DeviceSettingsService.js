import { DeviceSetting, Device } from '../database/models'

/**
 * This class implements a service for the DeviceSetting controller
 * The service will perform all operations on the database and if any other
 * controller or service needs to perform CRUD operations on the DeviceSetting model,
 * it will have to go through this class.
 */
export default class DeviceService {
  /**
   * This method creates a DeviceSetting entry based on the data provided
   * @param {Object} data
   */
  static async create(data) {
    return await DeviceSetting.create(data)
  }

  /**
   * This method gets a single DeviceSetting entry
   * @param {Object} args arguments by which to search the database
   */
  static async getOne(args) {
    return await DeviceSetting.findOne({
      where: args,
    })
  }

  /**
   * This method gets all DeviceSetting entries based on the arguments provided
   * @param {Object} args
   */
  static async getAll(args) {
    return await DeviceSetting.findAll({
      include: [
        {
          model: Device,
          where: args,
        },
      ],
    })
  }

  /**
   * This method removes a DeviceSetting entry
   * @param {Integer} id The device id that will be removed
   */
  static async remove(id) {
    return await DeviceSetting.destroy({ where: { id } })
  }

  /**
   * This method updates a DeviceSetting entry
   * @param {Object} settingData the data that will be updated
   * @param {Integer} id the id of the device that will be updated
   */
  static async update(settingData, id) {
    return await DeviceSetting.update(settingData, { where: { id } })
  }
}
