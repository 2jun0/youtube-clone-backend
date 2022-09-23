import { AppDataSource } from '../database/dataSource'
import { Account } from '../database/entities'
import HttpException, {
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'
import { middleware } from '../middlewares/middleware'
import { createAccessToken, createRefreshToken } from '../utils/jwt'
import { hash } from 'bcrypt'
import { AccountRepository } from '../repositories'

export const login: middleware = async (req, res) => {
  const { email, password } = req.body

  const account = await AccountRepository.findOneBy({ email })

  // 존재하는 유저인가? and 비밀번호가 일치한가?
  if (!account || (await AccountRepository.checkPassword(account, password))) {
    throw new HttpException(
      UnauthorizedStatus,
      '이메일과 비밀번호가 일치하지 않습니다'
    )
  }

  res.send({
    accessToken: createAccessToken(email),
    refreshToken: createRefreshToken(email),
  })
}

export const signIn: middleware = async (req, res) => {
  const { email, password, firstName, lastName } = req.body as Account

  const account = await AccountRepository.create(
    email,
    password,
    firstName,
    lastName
  )

  const savedAccount = await AccountRepository.save(account)
  res.send()
}
