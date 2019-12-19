'use strict'

import jwt from 'jsonwebtoken'
import config from '../config/config'

export default class AuthController {
  static verifyToken(req, res) {
    const token = req.headers['x-access-token']

    if (!token) {
      return res.status(403).send({ auth: null, message: 'No token.' })
    }

    jwt.verify(token, config.jwtSecret, (err, decode) => {
      if (err) {
        return res.send({ auth: false, message: 'Authentication failed!' })
      }
      res.status(200).send(decode)
    })
  }
}
