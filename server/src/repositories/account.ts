import 'dotenv/config'
import { compare, hash } from 'bcrypt'
import { AppDataSource } from '../database/dataSource'
import { Account } from '../database/entities'

const accountRepository = AppDataSource.getRepository(Account)

export const AccountRepository = accountRepository.extend({
  async create(
    email: Account['email'],
    password: Account['password'],
    firstName: Account['firstName'],
    lastName: Account['lastName']
  ) {
    const hashPassword = await hash(password, process.env.PASSWORD_SALT_ROUND)

    return accountRepository.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    })
  },

  async checkPassword(account: Account, password: Account['password']) {
    return await compare(account.password, password)
  },
})
