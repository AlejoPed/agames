import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import { dataBase } from './config/data-base'
import operatorRoutes from './operator/operator-routes'; // Importar las rutas del operador
import gameRoutes from './game/game-routes'; // Importar las rutas del juego
import productRoutes from './product/product-routes'

const app = express();
const port = 3000;

mongoose.set('strictQuery', false)
mongoose.connect(dataBase)
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.log({ database_error: err })
  })

// Middleware to parse JSON requests
app.use(express.json());

// Rutas relacionadas con el operador
app.use('/api', operatorRoutes);
app.use('/api', gameRoutes);
app.use('/api', productRoutes);

// Example route
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the Game Service!');
});

// Start the server
app.listen(port, () => {
    console.log(`Game Service is running on http://localhost:${port}`);
});