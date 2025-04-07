import { Request, Response } from 'express'
import Game from '../models/game-model'
import Product from '../models/product-model';
import Operator from '../models/operator-model';

export const GetGames = async (_req: Request, res: Response): Promise<void> => {
    try {
        
        const Products = await Product.find({})
        const Games = await Game.find({})

        res.status(200).json({ Products,Games })
    } catch (err) {
        res.status(400).json({ err })
    }
}