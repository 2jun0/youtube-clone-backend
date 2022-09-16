import { middleware } from './middleware'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { getDecodedAccessToken } from '../utils/jwt'
import HttpException, {
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'

export const verifyAuth: middleware = async (req, res, next) => {
  try {
    const decodedAccessToken = getDecodedAccessToken(req.headers.authorization)
    req.decodedToken = decodedAccessToken
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new HttpException(
        UnauthorizedStatus,
        '토큰이 만료되었습니다. 다시 로그인 해주십시오'
      )
    }

    throw new HttpException(UnauthorizedStatus)
  }
}
