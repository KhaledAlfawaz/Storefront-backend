import client from '../database';

export type product = {
  id?: number;
  name: string;
  price: number;
};

export class productModel {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot show products ${error}`);
    }
  }

  async show(id: string): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot show product ${error}`);
    }
  }

  async create(p: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name , price) VALUES($1 , $2) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create product ${error}`);
    }
  }
}
