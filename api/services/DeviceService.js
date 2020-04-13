import { Device } from '../database/models'

export default class DeviceService {
  static async create(device) {
    return await Device.create(device)
  }

  static async get(id) {
    return await Device.findOne({
      where: { id },
    })
  }

  static async getAll(args) {
    return await Device.findAll({ where: args })
  }

  static async remove(id) {
    return await Device.destroy({ where: { id } })
  }

  static async update(device, id) {
    return await Device.update(device, { where: { id } })
  }
}
