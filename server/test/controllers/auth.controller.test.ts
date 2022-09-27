import { Request, Response } from 'express'
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http'
import { authController } from '../../src/controllers'
import { Account } from '../../src/database/entities'
import { AccountRepository } from '../../src/repositories'
import HttpException, {
  UnauthorizedStatus,
} from '../../src/utils/exceptions/HttpException'
import { createAccessToken, createRefreshToken } from '../../src/utils/jwt'

jest.mock('../../src/utils/jwt')
const createAccessTokenMock = jest.mocked(createAccessToken)
const createRefreshTokenMock = jest.mocked(createRefreshToken)

AccountRepository.save = jest.fn()
AccountRepository.create = jest.fn()
AccountRepository.update = jest.fn()
AccountRepository.findOneBy = jest.fn(async where => {
  const email = where['email']
  if (correctAccount.email == email) return correctAccount
  else return null
})
AccountRepository.checkPassword = jest.fn(async (account, password) => {
  if (password == 'password') return true
  else return false
})

const correctAccount = new Account()
correctAccount.email = 'email'
correctAccount.password = 'password'

describe('auth.controller', () => {
  let req: MockRequest<Request>
  let res: MockResponse<Response>

  beforeEach(() => {
    req = createRequest()
    res = createResponse()

    jest.clearAllMocks()
  })

  describe('signin', () => {
    it('올바른 계정 생성', async () => {
      req.body = {
        email: 'aaaa1234',
        password: '1234',
        firstName: '홍',
        lastName: '길동',
      }

      await authController.signin(req, res, null)

      expect(AccountRepository.create).toHaveBeenCalledWith({
        email: 'aaaa1234',
        password: '1234',
        firstName: '홍',
        lastName: '길동',
      })
    })
  })

  describe('login', () => {
    it('계정이 없는 경우엔 401 오류를 응답해야 함', async () => {
      req.body = {
        email: 'aaaa1234',
        password: '1234',
      }

      await expect(authController.login(req, res, null)).rejects.toThrowError(
        new HttpException(
          UnauthorizedStatus,
          '이메일과 비밀번호가 일치하지 않습니다'
        )
      )
    })

    it('비밀번호가 일치하지 않으면 401 오류를 응답해야 함', async () => {
      req.body = {
        email: correctAccount.email,
        password: 'asdgd',
      }

      await expect(authController.login(req, res, null)).rejects.toThrowError(
        new HttpException(
          UnauthorizedStatus,
          '이메일과 비밀번호가 일치하지 않습니다'
        )
      )

      expect(AccountRepository.findOneBy).toHaveReturnedWith(
        Promise.resolve(correctAccount)
      )
      expect(AccountRepository.checkPassword).toHaveReturnedWith(
        Promise.resolve(false)
      )
    })
  })

  it('비밀번호와 이메일이 일치하면 Access, Refresh 토큰을 반환해야 함', async () => {
    req.body = {
      email: correctAccount.email,
      password: correctAccount.password,
    }

    await authController.login(req, res, null)

    expect(AccountRepository.findOneBy).toHaveReturnedWith(
      Promise.resolve(correctAccount)
    )
    expect(AccountRepository.checkPassword).toHaveReturnedWith(
      Promise.resolve(true)
    )
    expect(createAccessTokenMock).toBeCalledTimes(1)
    expect(createRefreshTokenMock).toBeCalledTimes(1)
  })
})
