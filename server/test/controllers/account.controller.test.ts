import { createRequest, createResponse } from 'node-mocks-http'
import { accountController } from '../../src/controllers'
import { AccountRepository } from '../../src/repositories'
import HttpException, {
  ForbiddenStatus,
} from '../../src/utils/exceptions/HttpException'

AccountRepository.save = jest.fn()
AccountRepository.create = jest.fn()
AccountRepository.update = jest.fn()

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
