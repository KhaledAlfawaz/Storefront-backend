import supertest from 'supertest';
import app from '../../server';
import { product } from '../../models/products';

const req = supertest(app);

describe('Product endpoint testing', () => {
  const testProdcut: product = {
    name: 'Test product',
    price: 10,
  };

  const user = {
    firstname: 'Test firstname',
    lastname: 'Test lastname',
    password: 'password123',
  };

  let token: string;
  beforeAll(async () => {
    const res = await req.post('/users').send(user);
    token = res.body;
  });

  it('test product create endpoint', async () => {
    const res = await req
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(testProdcut);
    expect(res.statusCode).toBe(200);
  });

  it('test product not to create endpoint', async () => {
    const res = await req.post('/users').send({ name: 'wrong' });
    expect(res.statusCode).toBe(400);
  });

  it('test product show endpoint', async () => {
    const res = await req
      .get('/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('test product index endpoint', async () => {
    const res = await req
      .get('/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
