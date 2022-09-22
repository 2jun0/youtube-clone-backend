import express from 'express'
import { accountController } from '../controllers'

export const router = express.Router()

router.post('/', accountController.createAccount)
router.patch('/:accountId', accountController.updateAccount)
router.get('/:accountId', accountController.getAccount)
router.delete('/:accountId', accountController.deleteAccount)
router.post('/token', accountController.createToken)
