import jwt from 'jsonwebtoken'
import { AppDataSource } from '../database/data-source'
import { Account } from '../database/entity'
import 'dotenv/config'

const accountRepository = AppDataSource.getRepository(Account)

export const getDecodedAccessToken: (string) => Account = accessToken => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as Account
}

export const createAccessToken = async (email: Account['email']) => {
  const account = await accountRepository.findOneBy({ email })

  const accessToken = jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_PERIOD,
  })

  return accessToken
}

export const createRefreshToken = async (email: Account['email']) => {
  const account = await accountRepository.findOneBy({ email })

  const refreshToken = jwt.sign(account, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_PERIOD,
  })

  return refreshToken
}

/** TODO: refresh token */
export const refreshToken = async refreshToken => {}
