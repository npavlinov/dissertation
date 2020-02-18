import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
const app = express()

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

export default app
