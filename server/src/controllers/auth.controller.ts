import { AppDataSource } from '../database/dataSource'
import { Account } from '../database/entities'
import HttpException, {
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'
import { middleware } from '../middlewares/middleware'
import { createAccessToken, createRefreshToken } from '../utils/jwt'

const accountRepository = AppDataSource.getRepository(Account)

export const login: middleware = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // 존재하는 유저인가?
  const account = await accountRepository.findOneBy({ email, password })
  if (!account) {
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
