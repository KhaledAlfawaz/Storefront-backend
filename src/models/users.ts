import client from '../database';
import bcrypt from 'bcrypt';

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { PEPPER } = process.env;

export class userModel {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot show user ${error}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot show user ${error}`);
    }
  }

  async create(u: user): Promise<user> {
    try {
      const conn = await client.connect();
      const hashedPassword = bcrypt.hashSync(
        (u.password + PEPPER) as string,
        12
      );
      const sql =
        'INSERT INTO users (firstname , lastname , password) VALUES($1 , $2 , $3) RETURNING *';
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot create user ${error}`);
    }
  }
  
}
