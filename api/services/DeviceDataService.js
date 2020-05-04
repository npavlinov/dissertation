import { DeviceData } from '../database/models'

export default class DeviceService {
  static async create(data) {
    return await DeviceData.create(data)
  }

  static async getOne(args) {
    return await DeviceData.findOne({
      where: args,
    })
  }

  static async getAll(args) {
    return await DeviceData.findAll({
      where: args,
      attributes: ['data', 'deviceId', 'fetchTime', 'id'],
    })
  }

  static async remove(id) {
    return await DeviceData.destroy({ where: { id } })
  }

  static async update(deviceData, id) {
    return await DeviceData.update(deviceData, { where: { id } })
  }
}
