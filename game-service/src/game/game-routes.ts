import express from 'express'
import { GetGames } from './game-controller'
import { auth } from '../middlewares/auth-middleware'

const router = express.Router()

router.get('/get_games', async (req: express.Request, res: express.Response) => await GetGames(req, res))
router.post('/register_game',auth, async (req: express.Request, res: express.Response) => await GetGames(req, res))

export default router
