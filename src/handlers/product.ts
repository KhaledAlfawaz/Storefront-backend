import express, { Response, Request } from 'express';
import { productModel, product } from '../models/products';
import { verifyToken } from '../middleware/authentication';
import dotenv from 'dotenv';

dotenv.config();

const product = new productModel();

const index = async (_req: Request, res: Response) => {
  const products = await product.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const p = await product.show(id);
    res.json(p);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p = {
      name: req.body.name as string,
      price: req.body.price as number,
    };

    const newProduct = await product.create(p);
    res.json(newProduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyToken, create);
};

export default productRoutes;
