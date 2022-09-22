import { createRequest, createResponse } from 'node-mocks-http'
import { accountController } from '../../src/controllers'
import { AppDataSource } from '../../src/database/dataSource'
import { Account } from '../../src/database/entities'
import HttpException, {
  ForbiddenStatus,
} from '../../src/utils/exceptions/HttpException'

const accountRepository = AppDataSource.getRepository(Account)

accountRepository.save = jest.fn()
accountRepository.create = jest.fn()
accountRepository.update = jest.fn()

describe('createAccount', () => {
  it('올바른 계정 생성', async () => {
    let req = createRequest({
      body: {
        email: 'aaaa1234',
        password: '1234',
        firstName: '홍',
        lastName: '길동',
      },
    })
    let res = createResponse()

    await accountController.createAccount(req, res, null)

    expect(accountRepository.create).toHaveBeenCalledWith({
      email: 'aaaa1234',
      password: '1234',
      firstName: '홍',
      lastName: '길동',
    })
  })
})

describe('updateAccount', () => {
  const res = createResponse()

  it('토큰이 없는 경우엔 403에러를 응답해야 함', async () => {
    const req = createRequest({
      params: {
        accountId: 1,
      },
    })
    await expect(
      accountController.updateAccount(req, res, null)
    ).rejects.toThrowError(new HttpException(ForbiddenStatus))
  })
})

describe('deleteAccount', () => {
  const res = createResponse()

  it('토큰이 없는 경우엔 403에러를 응답해야 함', async () => {
    const req = createRequest({
      params: {
        accountId: 1,
      },
    })
    await expect(
      accountController.deleteAccount(req, res, null)
    ).rejects.toThrowError(new HttpException(ForbiddenStatus))
  })
})

describe('getAccount', () => {
  const res = createResponse()

  it('토큰이 없는 경우엔 403에러를 응답해야 함', async () => {
    const req = createRequest({
      params: {
        accountId: 1,
      },
    })
    await expect(
      accountController.getAccount(req, res, null)
    ).rejects.toThrowError(new HttpException(ForbiddenStatus))
  })
})
