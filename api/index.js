import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'
import routes from './routes'
import SocketController from './controllers/SocketController'

const app = express()
const wss = new WebSocket.Server({ port: 8080 })

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

export default app
