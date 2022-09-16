import { Account } from '../src/database/entity'

declare global {
  namespace Express {
    export interface Request {
      decodedToken?: Account
    }
  }
}
