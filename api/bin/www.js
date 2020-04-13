import config from '../config/config'
import app from '../index'

const env = process.env

export const nodeEnv = env.NODE_ENV || 'development'

const port = env.PORT || config.api.port
const host = env.host || config.api.host

function serverUrl() {
  return `http://${host}:${port}`
}

app.listen(port, host, () => {
  console.log('Server on:', serverUrl())
})
