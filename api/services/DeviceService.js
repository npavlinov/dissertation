import { Device } from '../database/models'

export default class DeviceService {
  static async create(device) {
    return await Device.create(device)
  }

  static async getOne(args) {
    return await Device.findOne({
      where: args,
    })
  }

  static async getAll(args) {
    return await Device.findAll({
      where: args,
      attributes: ['name', 'ip', 'connected', 'fetchTime', 'id'],
    })
  }

  static async remove(id) {
    return await Device.destroy({ where: { id } })
  }

  static async update(device, id) {
    return await Device.update(device, { where: { id } })
  }
}
