import { DeviceSetting, Device } from '../database/models'

export default class DeviceService {
  static async create(data) {
    return await DeviceSetting.create(data)
  }

  static async getOne(args) {
    return await DeviceSetting.findOne({
      where: args,
    })
  }

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

  static async remove(id) {
    return await DeviceData.destroy({ where: { id } })
  }

  static async update(deviceData, id) {
    return await DeviceData.update(deviceData, { where: { id } })
  }
}
