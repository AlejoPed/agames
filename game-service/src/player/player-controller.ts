import { Request, Response } from 'express'
import Game from '../game/game-model';
import Product from '../product/product-model';	
import 'dotenv/config'
///controllers

///CREATE SESSION
export const GetSession = async (req: Request, res: Response): Promise<void> => {
    try {
        //req.query => operatorId, channelId, gameId, languaje, playerId
        const { operatorId, channelId, gameId, languaje, playerId } = req.query
        
        if (!operatorId || !channelId || !gameId || !languaje || !playerId) {
            res.status(400).json({ error: 'Missing required parameters' })
            return
        }


        const Products = await Product.find({})
        const Games = await Game.find({})

        res.status(200).json({ Products,Games })
    } catch (err) {
        res.status(400).json({ err })
    }
}
//BET

//CRUD FOR PLAYER
