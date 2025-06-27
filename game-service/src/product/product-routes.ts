import express from 'express'
import { GetProducts, RegisterProduct } from './product-controller';
import { auth } from '../middlewares/auth-middleware';

const router = express.Router()

// Ruta para obtener todos los productos
router.get('/get_products', async (req: express.Request, res: express.Response) => await GetProducts(req, res))
router.post('/register_product',auth, async (req: express.Request, res: express.Response) => await RegisterProduct(req, res))

export default router;