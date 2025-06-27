import express from 'express'
import { GetOperators, RegisterOperator, LoginOperator, UpdateOperator, DeleteOperator } from './operator-controller'
import { auth } from '../middlewares/auth-middleware'


const router = express.Router()

router.get('/get_operators', auth, async (req: express.Request, res: express.Response) => await GetOperators(req, res))

router.post('/register_operator', auth, async (req: express.Request, res: express.Response) => await RegisterOperator(req, res))

router.put('/update_operator', auth, async (req: express.Request, res: express.Response) => await UpdateOperator(req, res))

router.post('/login', async (req: express.Request, res: express.Response) => await LoginOperator(req, res))

router.put('/delete_operator', auth, async (req: express.Request, res: express.Response) => await DeleteOperator(req, res))

export default router
