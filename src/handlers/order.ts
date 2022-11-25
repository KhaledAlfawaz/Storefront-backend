import express, { Response, Request } from 'express';
import { orderModel } from '../models/orders';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/authentication';

dotenv.config();

const order = new orderModel();

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const o = await order.currentOrderByUser(userId);
    res.json(o);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const p = {
      user_id: req.body.user_id as number,
      status: req.body.status as string,
    };

    const newOrder = await order.create(p);
    res.json(newOrder);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const od = {
      order_id: parseInt(req.params.id),
      product_id: parseInt(req.body.product_id),
      quantity: parseInt(req.body.quantity),
    };
    if (!od.order_id || !od.product_id || !od.quantity) {
      return res
        .status(400)
        .send(
          'Error, missing or wrong parameters. (productId , quantity , orderId ) are  required'
        );
    }
    const p = await order.addProduct(od);
    res.json(p);
  } catch (error) {
    res.status(500);
    res.json(`cannot add product : ${error}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyToken, create);
  app.get('/orders/:userId', verifyToken, currentOrderByUser);
  app.post('/orders/:id/products', verifyToken, addProduct);
};

export default orderRoutes;
