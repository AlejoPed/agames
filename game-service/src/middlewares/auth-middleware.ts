import jwt from 'jsonwebtoken'
import roles from '../config/roles.json'
import { RequestHandler } from 'express'
import { OperatorData } from '../types'
import { Role } from '../enums'
import 'dotenv/config'

const auth: RequestHandler = (req, res, next) => {
  try {
    let token = ''
    console.log(req.headers)
    if (req.headers.authorization !== undefined) {
      token  = req.headers.authorization.replace('Bearer ', '')
    } else {
      token = (req.query.token as string)
    }
    const decoded = jwt.verify(token, (process.env.SECRET as string)) as OperatorData
    const userRole = decoded.role as Role
    console.log(decoded,userRole,roles[userRole])
    if (!roles[userRole].access.includes(req.route?.path ?? req.baseUrl)) {
      return res.status(200).json({
        message: 'Permission Denied'
      })
    }
    res.locals.userData = decoded
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      result: 'error',
      message: 'Authentification Failed'
    })
  }
}

export { auth }
