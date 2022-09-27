import { Account } from '../database/entities'
import HttpException, {
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'
import { middleware } from '../middlewares/middleware'
import { createAccessToken, createRefreshToken } from '../utils/jwt'
import { AccountRepository } from '../repositories'

export const login: middleware = async (req, res) => {
  const { email, password } = req.body

  const account = await AccountRepository.findOneBy({ email })

  // 존재하는 유저인가? and 비밀번호가 일치한가?
  if (
    account === null ||
    !(await AccountRepository.checkPassword(account, password))
  ) {
    throw new HttpException(
      UnauthorizedStatus,
      '이메일과 비밀번호가 일치하지 않습니다'
    )
  }

  res.send({
    accessToken: await createAccessToken(email),
    refreshToken: await createRefreshToken(email),
  })
}

export const signin: middleware = async (req, res) => {
  const account = await AccountRepository.create(req.body)

  const savedAccount = await AccountRepository.save(account)
  res.send()
}
