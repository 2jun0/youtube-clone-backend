import { AppDataSource } from '../database/data-source'
import { Account } from '../database/entity'
import { middleware } from '../middlewares/middleware'

const accountRepository = AppDataSource.getRepository(Account)

export const createAccount: middleware = async (req, res, next) => {
  try {
    const account = accountRepository.create(req.body)
    const savedAccount = await accountRepository.save(account)
    return res.send(savedAccount)
  } catch (err) {
    console.error(err)
  }
}

export const updateAccount: middleware = async (req, res, next) => {
  try {
    const accountId = req.params.accountId as unknown as number
    await accountRepository.update(accountId, req.body)
  } catch (err) {
    console.error(err)
  }
}

export const deleteAccount: middleware = async (req, res, next) => {
  try {
    const accountId = req.params.accountId as unknown as number
    await accountRepository.delete(accountId)
  } catch (err) {
    console.error(err)
  }
}

export const getAccount: middleware = async (req, res, next) => {
  try {
    const accountId = req.params.accountId as unknown as number
    const account = await accountRepository.findOneBy({ id: accountId })
    return res.send(account)
  } catch (err) {
    console.error(err)
  }
}

/** TODO: create access token and refresh token */
export const createToken: middleware = async (req, res, next) => {
  try {
    const { email, password } = req.body
  } catch (err) {
    console.error(err)
  }
}

/** This function is not planned yet */
export const refreshToken: middleware = async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err)
  }
}
