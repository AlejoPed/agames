import { Request, Response } from 'express'
import Game from './game-model'
import Product from '../product/product-model';
// import Operator from '../operator/operator-model';

export const GetGames = async (_req: Request, res: Response): Promise<void> => {
    try {
        //req.query => operatorId 
        const Products = await Product.externalSearch({})
        const Games = await Game.externalSearch({})

        res.status(200).json({ Products,Games })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}