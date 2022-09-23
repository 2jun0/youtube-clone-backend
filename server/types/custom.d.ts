import { Account } from '../src/database/entities'

declare global {
  namespace Express {
    export interface Request {
      decodedToken?: Account
    }
  }
}
