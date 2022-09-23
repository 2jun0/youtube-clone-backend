import { Account } from '../database/entities'
import { middleware } from '../middlewares/middleware'
import { AccountRepository } from '../repositories'
import HttpException, {
  ForbiddenStatus,
  UnauthorizedStatus,
} from '../utils/exceptions/HttpException'

export const updateAccount: middleware = async (req, res, next) => {
  const accountId = req.params.accountId as unknown as number
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }

  if (req.decodedToken.id != accountId) {
    throw new HttpException(UnauthorizedStatus)
  }

  await AccountRepository.update(accountId, req.body)
}

export const deleteAccount: middleware = async (req, res, next) => {
  const accountId = req.params.accountId as unknown as number
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }

  if (req.decodedToken.id != accountId) {
    throw new HttpException(UnauthorizedStatus)
  }

  await AccountRepository.delete(accountId)
}

export const getAccount: middleware = async (req, res, next) => {
  const accountId = req.params.accountId as unknown as number
  if (!req.decodedToken) {
    throw new HttpException(ForbiddenStatus)
  }

  if (req.decodedToken.id != accountId) {
    throw new HttpException(UnauthorizedStatus)
  }

  const partialAccount = await AccountRepository.findOne({
    where: { id: accountId },
    select: ['email', 'firstName', 'lastName'],
  })
  return res.send(partialAccount)
}
