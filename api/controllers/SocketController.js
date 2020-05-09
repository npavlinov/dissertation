'use strict'

import DeviceService from '../services/DeviceService'
import DeviceDataService from '../services/DeviceDataService'
import events from 'events'

const event = new events.EventEmitter()
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
    let sockets = {}

    /* check if connection is broken, code taken from
      ref: https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
    */
    function noop() {}

    function heartbeat() {
      this.isAlive = true
    }

    const interval = setInterval(function ping() {
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate()

        ws.isAlive = false
        ws.ping(noop)
      })
    }, 30000)

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
        req.reject()
        console.log('Device is not present in the database')
        return
      }

      ws.isAlive = true
      ws.on('pong', heartbeat)

      sockets[requestIp] = ws

      // get device per IP
      const device = await DeviceService.getOne({ ip: requestIp })
      await DeviceService.update({ connected: true }, device.id)
      // when a message is received, parse it and save it to DB
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

      ws.on('close', async () => {
        await DeviceService.update({ connected: false }, device.id)
        clearInterval(interval)
        console.log('Connection lost')
      })

      // if user wants to send a message to device, send it
      event.on('sendSetting', (setting) => {
        const socketToSendTo = sockets[setting.Device.ip]
        socketToSendTo.send(setting.message)
      })

      ws.send('Fetch time: ' + device.fetchTime)
      console.log('new client connected')
    })
  }

  /**
   * This method emits an event, that will send a message to device
   * @param {Object} req
   * @param {Object} res
   */
  static async sendMessage(req, res) {
    try {
      event.emit('sendSetting', req.body)
      res.send(200)
    } catch (err) {
      console.log(err)
    }
  }
}
