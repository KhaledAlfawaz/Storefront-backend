import express, { Response, Request } from 'express';
import { userModel, user } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/authentication';

dotenv.config();

const user = new userModel();

const index = async (_req: Request, res: Response) => {
  const users = await user.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const u = await user.show(id);
    res.json(u);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const u: user = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };

    if (!u.firstname || !u.lastname || !u.password) {
      return res
        .status(400)
        .send(
          'Error, missing or wrong parameters. (firstname , lastname ,password) are  required'
        );
    }
    const newUser = await user.create(u);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(500);
    res.json(`cannot create user ${error}`);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
  app.post('/users', create);
};

export default usersRoutes;
