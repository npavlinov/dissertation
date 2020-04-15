import jwt from 'jsonwebtoken'
import config from '../config/config.json'

export function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization']

  if (!token) {
    return res.status(403).send({ auth: null, message: 'No token.' })
  }

  jwt.verify(token, config.jwtSecret, (err, decode) => {
    if (err) {
      console.log(err)
      return res.send({ auth: false, message: 'Authentication failed!' })
    }

    req.id = decode.id
    req.username = decode.username
    next()
  })
}

export function signToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    config.jwtSecret,
    {
      expiresIn: 86400,
    }
  )
  return token
}
