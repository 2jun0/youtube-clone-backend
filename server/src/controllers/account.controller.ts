import { AppDataSource } from '../database/dataSource'
import { Account } from '../database/entities'
import { middleware } from '../middlewares/middleware'
import HttpException, {
  ForbiddenStatus,
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'

const accountRepository = AppDataSource.getRepository(Account)

export const createAccount: middleware = async (req, res, next) => {
  const account = accountRepository.create(req.body)
  const savedAccount = await accountRepository.save(account)
  return res.send(savedAccount)
}

export const updateAccount: middleware = async (req, res, next) => {
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }
  const accountId = req.params.accountId as unknown as number
  await accountRepository.update(accountId, req.body)
}

export const deleteAccount: middleware = async (req, res, next) => {
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }
  const accountId = req.params.accountId as unknown as number
  await accountRepository.delete(accountId)
}

export const getAccount: middleware = async (req, res, next) => {
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }
  const accountId = req.params.accountId as unknown as number

  if (accountId != req.decodedToken.accountId) {
    throw new HttpException(UnauthorizedStatus)
  }
  const account = await accountRepository.findOneBy({ id: accountId })
  return res.send(account)
}
