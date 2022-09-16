import { Request, Response, NextFunction } from 'express'
import HttpException from '../utils/exceptions/HttpException'

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).send({ status: err.status, message: err.message })
}
