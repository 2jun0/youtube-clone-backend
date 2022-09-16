import { QueryRunner, Repository } from 'typeorm'
import { AppDataSource } from '../../src/database/data-source'
import { Account } from '../../src/database/entity'
import { PGErrorCode } from '../../src/utils/constants/postgres-error'

let queryRunner: QueryRunner
let accountRepository: Repository<Account>

describe('accounts 테이블 테스트', () => {
  beforeAll(async () => {
    // connect db
    await AppDataSource.initialize()

    // connect query runner
    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.connect()
  })

  afterAll(async () => {
    // release query runner
    await queryRunner.release()

    // close db connection
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    // start new transaction
    await queryRunner.startTransaction()

    // get account repository
    accountRepository = queryRunner.manager.getRepository(Account)
  })

  afterEach(async () => {
    // rollback this transaction
    await queryRunner.rollbackTransaction()
  })

  it('중복 이메일', async () => {
    let accountA = new Account()
    accountA.email = 'test@test.com'
    accountA.firstName = 'A'
    accountA.lastName = 'B'
    accountA.password = 'password'
    await accountRepository.save(accountA)

    let accountB = new Account()
    accountB.email = 'test@test.com'
    accountB.firstName = 'A'
    accountB.lastName = 'B'
    accountB.password = 'password'

    await expect(
      accountRepository.save(accountB).catch(err => err.code)
    ).resolves.toEqual(PGErrorCode.UNIQUE_VIOLATION)
  })

  it('레코드 생성 테스트', async () => {
    let account = new Account()
    account.email = 'test@test.com'
    account.firstName = 'A'
    account.lastName = 'B'
    account.password = 'password'
    await accountRepository.save(account)

    let savedAccount = await accountRepository.findOneBy({ id: account.id })
    expect(savedAccount).not.toBeNull()
  })
})
