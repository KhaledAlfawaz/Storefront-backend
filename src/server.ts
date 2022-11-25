import express, { Request, Response } from 'express';
import cors from 'cors';
import usersRoutes from './handlers/user';
import orderRoutes from './handlers/order';
import productRoutes from './handlers/product';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

usersRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
