import supertest from 'supertest';
import { user } from '../../models/users';
import app from '../../server';

const req = supertest(app);


describe('User endpoint testing', () => {
  const user: user = {
    firstname: 'Test firstname',
    lastname: 'Test lastname',
    password: 'password123',
  };

  let token: string;

  it('test user create endpoint', async () => {
    const res = await req.post('/users').send(user);
    token = res.body;
    expect(res.statusCode).toBe(200);
  });

  it('test user to not create endpoint', async () => {
    const res = await req.post('/users').send({ firsname: 'wrong' });
    expect(res.statusCode).toBe(400);
  });

  it('test user show endpoint', async () => {
    const res = await req
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('test user index endpoint', async () => {
    const res = await req
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
