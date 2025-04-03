import { Request, Response } from 'express'
import Operator from '../models/operator-model'
import Channel from '../models/channel-model'
import Product from '../models/product-model'

export const GetOperators = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await Operator.find({})
        res.status(200).json({ users })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const RegisterOperator = async (req: Request, res: Response): Promise<void> => {
    try {
        const isOperator = await Operator.findByOperatorName(req.body.operatorName);
        if (isOperator) {
            res.status(409).json({ message: 'userName already in use' });
            return;
        }

        // Obtener los productos existentes y activos en la base de datos usando productId
        const productIds = req.body.products.map((p: { productId: number }) => p.productId);
        const existingProducts = await Product.find({ 
            productId: { $in: productIds }, 
            active: true // 🔥 Solo productos activos
        });

        // Filtrar productos inactivos o inexistentes
        const activeProductIds = existingProducts.map(product => product.productId);
        const ignoredProducts = req.body.products.filter((p: { productId: number }) => !activeProductIds.includes(p.productId));

        // Crear la lista de productos con _id de Mongo
        const productsWithMongoId = existingProducts.map(product => ({
            _id: product._id, // ID de MongoDB
            productId: product.productId, // ID de negocio
            name: product.category, // Nombre del producto
            category: product.category // Categoría del producto
        }));

        // Crear nuevo operador con los productos referenciados correctamente
        const user = new Operator({
            ...req.body,
            products: productsWithMongoId // Guardamos productos activos con el _id de Mongo
        });

        const data = await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({ 
            data, 
            token, 
            ignoredProducts // 🔥 Avisamos qué productos no se registraron
        });

    } catch (err:any) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};


export const LoginOperator = async (req: Request, res: Response): Promise<void> => {
    try {
        const operatorName = req.body.operatorName;
        const password = req.body.password;

        const operator = await Operator.findByCredentials(operatorName, password);

        if (operator.error !== undefined) {
            res.status(401).json({ error: operator.error });
            return;
        }

        if (!operator.active) {
            res.status(401).json({ error: 'Unauthorized user' });
            return;
        }

        const activeProducts = await Product.find({
            productId: { $in: operator.products.map((p: { productId: number }) => p.productId) },
            status: true
        }).lean();

        console.log(operator)
        const userData = {
            id: operator._id.toString(),
            operatorId: operator.operatorId,
            operatorName: operator.operatorName,
            role: operator.role,
            channels: operator.channels,
            productsConfig: {
                activeProducts: activeProducts.map(product => ({
                    id: product.productId,
                    name: product.category,
                    category: product.category,
                }))
            }
        };

        const token = await operator.generateAuthToken();
        res.status(200).json({ userData, token });

    } catch (err: any) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
};

export const UpdateOperator = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, updateData } = req.body;

        // Verificar si el operador existe
        const isOperator = await Operator.findById(id);
        if (!isOperator) {
            res.status(404).json({ message: 'Operator not found' });
            return;
        }

        // Manejar la actualización de productos si se envía la clave "products"
        let ignoredProducts = [];
        if (updateData.products) {
            // Obtener los productId enviados
            const productIds = updateData.products.map((p: { productId: number }) => p.productId);

            // Buscar los productos activos en la BD
            const activeProducts = await Product.find({ 
                productId: { $in: productIds }, 
                active: true
            });

            // Filtrar los productos que no existen o están inactivos
            const activeProductIds = activeProducts.map(product => product.productId);
            ignoredProducts = updateData.products.filter((p: { productId: number }) => !activeProductIds.includes(p.productId));

            // Mapear los productos activos con su _id de Mongo
            updateData.products = activeProducts.map(product => ({
                _id: product._id,
                productId: product.productId,
                name: product.category,
                category: product.category
            }));
        }

        // Aplicar la actualización solo con los campos enviados en updateData
        const updatedUser = await Operator.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ updatedUser, ignoredProducts });

    } catch (err: any) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

export const DeleteOperator = async (req: Request, res: Response): Promise<void> => {
    try {
        const isOperator = await Operator.findById(req.query.userId)
        if (isOperator === null) {
            res.status(404).json({
                message: 'Operator not found'
            })
            return
        }
        await Operator.deleteOne({ _id: req.query.userId })
        res.status(200).json({ message: 'Operator deleted' })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const GetChannels = async (_req: Request, res: Response): Promise<void> => {
    try {
        const channels = await Channel.find({})
        res.status(200).json({ channels })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const RegisterChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findOne({ name: req.body.name })
        if (isChannel) {
            res.status(409).json({
                message: 'Channel name already in use'
            })
            return
        }
        const channel = new Channel(req.body)
        const data = await channel.save()
        res.status(201).json({ data })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const UpdateChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findById(req.body.channelId)
        if (isChannel === null) {
            res.status(404).json({
                message: 'Channel not found'
            })
            return
        }
        const updateData = req.body.updateData
        const channel = await Channel.updateOne({ _id: req.body.channelId }, updateData)
        res.status(200).json({ channel })
    } catch (err) {
        res.status(400).json({ err })
    }
}

export const DeleteChannel = async (req: Request, res: Response): Promise<void> => {
    try {
        const isChannel = await Channel.findById(req.query.channelId)
        if (isChannel === null) {
            res.status(404).json({
                message: 'Channel not found'
            })
            return
        }
        await Channel.deleteOne({ _id: req.query.channelId })
        res.status(200).json({ message: 'Channel deleted' })
    } catch (err) {
        res.status(400).json({ err })
    }
}