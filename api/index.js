import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import WebSocket from 'ws'
import routes from './routes'
const app = express()
// const ws = new WebSocket('ws://192.168.0.111:80')
// const wsServer = new WebSocket.Server({server: app});

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

// ws.on('open', function open() {
//   console.log('connected')
//   ws.send('message');
// });
// wsServer.on('connection', (ws, req) => {
//   ws.on('message', (message) => {
//     console.log('Received: ', message)
//   });

//   ws.on('close', () => {
//     console.log('Connection lost')
//   })

//   console.log("new client connected");
// })


export default app
