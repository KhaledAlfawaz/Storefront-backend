import { order } from '../../models/orders';
import supertest from 'supertest';
import app from '../../server';
import { orderProduct } from '../../models/orderProducts';

const req = supertest(app);

describe('Product endpoint testing', () => {
  const testOrder: order = {
    user_id: 1,
    status: 'active',
  };

  const testOrderProduct: orderProduct = {
    quantity: 10,
    product_id: 1,
    order_id: 1,
  };

  const testProdcut = {
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
    await req
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(testProdcut);
  });

  it('test order create endpoint', async () => {
    const res = await req
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(testOrder);
    expect(res.statusCode).toBe(200);
  });

  it('test order not to create endpoint', async () => {
    const res = await req.post('/users').send({ name: 'wrong' });
    expect(res.statusCode).toBe(400);
  });

  it('test add product to an order endpoint', async () => {
    const res = await req
      .post('/orders/1/products')
      .set('Authorization', `Bearer ${token}`)
      .send(testOrderProduct);
    expect(res.statusCode).toBe(200);
  });

  it('test current order by user endpoint', async () => {
    const res = await req
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
