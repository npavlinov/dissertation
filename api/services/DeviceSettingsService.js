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
    return await DeviceSetting.destroy({ where: { id } })
  }

  static async update(settingData, id) {
    return await DeviceSetting.update(settingData, { where: { id } })
  }
}
