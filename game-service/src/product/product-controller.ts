import Product from "./product-model";
import { Request, Response } from "express";

export const GetProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({}).sort({ name: 1 }).collation({ locale: 'en', caseLevel: true })
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}
export const RegisterProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
}