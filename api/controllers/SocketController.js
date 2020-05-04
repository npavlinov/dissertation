'use strict'

import DeviceService from '../services/DeviceService'
import DeviceDataService from '../services/DeviceDataService'
/**
 * This class is a Controller for the websocket server,
 * which will act as a connection between the devices and the dashboard
 */
export default class SocketController {
  /**
   * This method runs the socket server and includes the logic for allowing
   * different devices
   * It will follow the following algorithm:
   *  - Device is trying to connect to the websocket server
   *  - If the IP of the device is present in the database -> allow the connection
   *  - When device connects -> send the device's fetch time so that it knows how often
   *    to send data to the dashboard API
   *  - Once data is received, save it to the database
   * @param {Object} wss the websocket server
   */
  static async runSockets(wss) {
    wss.on('connection', async (ws, req) => {
      // get all devices
      const devices = await DeviceService.getAll({})
      const deviceIps = devices.map((device) => {
        return device.ip
      })

      // get the ip of the device, trying to connect, convert it to IPv4
      const requestIp = ws._socket.remoteAddress.replace('::ffff:', '')

      // check if the device's IP is included in the DB
      if (!deviceIps.includes(requestIp)) {
        console.log('Device is not present in the database')
        ws.close()
        return
      }

      // get device per IP
      const device = await DeviceService.getOne({ ip: requestIp })

      ws.on('message', async (message) => {
        try {
          const messageJson = JSON.parse(message)
          const fetchTime = Object.keys(messageJson)[0]
          const deviceData = {
            data: messageJson[fetchTime],
            fetchTime,
            deviceId: device.id,
          }
          await DeviceDataService.create(deviceData)
        } catch (err) {
          console.log(err)
          console.log('Received: ', message)
          ws.send('Not a valid JSON')
        }
      })

      ws.on('close', () => {
        console.log('Connection lost')
      })

      ws.send('Fetch time: ' + device.fetchTime)

      console.log('new client connected')
    })
  }
}
