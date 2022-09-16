import express from 'express'
import * as accountController from '../controllers/account'

export const router = express.Router()

router.post('/', accountController.createAccount)
router.patch('/:accountId', accountController.updateAccount)
router.get('/:accountId', accountController.getAccount)
router.delete('/:accountId', accountController.deleteAccount)
router.post('/token', accountController.createToken)
