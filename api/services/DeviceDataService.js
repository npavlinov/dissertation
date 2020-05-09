import { DeviceData, Device } from '../database/models'

export default class DeviceService {
  static async create(data) {
    return await DeviceData.create(data)
  }

  static async getOne(args) {
    return await DeviceData.findOne({
      where: args,
    })
  }

  static async getAll(args, limit, order = 'desc') {
    try {
      const devices = await Device.findAll({
        where: args,
      })
      const devicesData = await Promise.all(
        devices.map(async (device) => {
          return await device
            .getDeviceData({
              limit: limit || null,
              order: [['createdAt', order]],
              attributes: ['data'],
              raw: true,
            })
            .map((device) => device.data)
        })
      )
      return devicesData
    } catch (err) {
      console.log(err)
    }
  }

  static async remove(id) {
    return await DeviceData.destroy({ where: { id } })
  }

  static async update(deviceData, id) {
    return await DeviceData.update(deviceData, { where: { id } })
  }
}
