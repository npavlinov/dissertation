import { Device } from '../database/models'

export default class DeviceService {
  static async checkIp(deviceData) {
    const device = await Device.findOne({
      where: {
        username: deviceData.username,
        ip: deviceData.ip,
      },
    })

    return device ? true : false
  }

  static async create(device) {
    return await Device.create(device)
  }

  static async get(id) {
    return await Device.findOne({
      where: { id },
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
