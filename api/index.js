import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'
import routes from './routes'
import SocketController from './controllers/SocketController'

const app = express()
const wss = new WebSocket.Server({ port: 8080 })

// const ws = new WebSocket('ws://192.168.0.111:80')
// dns.lookup(os.hostname(), (err, add, fam) => {
//   console.log('addr: ', add)
// })

app.use(
  cors({
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Headers',
    ],
    origin: 'http://localhost:3000',
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)

app.get('/api/ping', (req, res) => {
  res.json({ msg: 'pong' })
})

SocketController.runSockets(wss)

// ws.on('open', function open() {
//   console.log('connected')
//   ws.send('message');
// });
// wss.on('connection', (ws, req) => {
//   ws.on('message', (message) => {
//     console.log('Received: ', message)
//     ws.send('test')
//   })

//   ws.on('close', () => {
//     console.log('Connection lost')
//   })

//   console.log('new client connected')
// })

export default app
