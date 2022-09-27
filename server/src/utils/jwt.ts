import jwt from 'jsonwebtoken'
import { Account } from '../database/entities'
import 'dotenv/config'

export const getDecodedAccessToken: (string) => Account = accessToken => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as Account
}

export const createAccessToken = async (email: Account['email']) => {
  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_PERIOD,
  })

  return accessToken
}

export const createRefreshToken = async (email: Account['email']) => {
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_PERIOD,
  })

  return refreshToken
}

/** TODO: refresh token */
export const refreshToken = async refreshToken => {}
