import client from '../database';
import { orderProduct } from './orderProducts';

export type order = {
  id?: number;
  user_id: number;
  status: string;
};

export class orderModel {
  async currentOrderByUser(userId: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot show order ${error}`);
    }
  }

  async create(o: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status , user_id) VALUES($1 , $2) RETURNING *';
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create order ${error}`);
    }
  }

  async addProduct(od: orderProduct): Promise<orderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity , product_id , order_id) VALUES ($1 , $2 , $3) RETURNING *';
      const result = await conn.query(sql, [
        od.quantity,
        od.product_id,
        od.order_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `cannot add product ${od.product_id} to order ${od.order_id} : ${error}`
      );
    }
  }
}
