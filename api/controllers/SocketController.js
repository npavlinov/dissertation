'use strict'

export default class SocketController {
  static async runSockets(wss) {
    wss.on('connection', (ws, req) => {
      ws.on('message', (message) => {
        console.log('Received: ', message)
        ws.send('test')
      })

      ws.on('close', () => {
        console.log('Connection lost')
      })

      console.log('new client connected')
    })
  }
}
