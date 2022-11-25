import { orderProduct } from '../../models/orderProducts';
import { orderModel, order } from '../../models/orders';
import { productModel, product } from '../../models/products';
import { userModel, user } from '../../models/users';

const order = new orderModel();
const product = new productModel();
const user = new userModel();

const testOrder: order = {
  user_id: 1,
  status: 'active',
};

const testProdcut: product = {
  name: 'Test product',
  price: 10,
};

const testUser: user = {
  firstname: 'Test firstname',
  lastname: 'Test lastname',
  password: 'testpassword',
};

const testOrderProduct: orderProduct = {
  quantity: 10,
  product_id: 1,
  order_id: 1,
};

describe('Order Modle', () => {
  // I had to add product and user before all so i dont get errors

  beforeAll(async () => {
    await product.create(testProdcut);
    await user.create(testUser);
  });

  it('create method test', async () => {
    const result = await order.create(testOrder);
    const { user_id, status } = result;
    expect({ user_id, status }).toEqual({
      user_id: testOrder.user_id,
      status: testOrder.status,
    });
  });

  it('add porduct method test', async () => {
    const result = await order.addProduct(testOrderProduct);
    const { quantity, product_id, order_id } = result;
    expect({ quantity, product_id, order_id }).toEqual({
      quantity: testOrderProduct.quantity,
      product_id: testOrderProduct.product_id,
      order_id: testOrderProduct.order_id,
    });
  });

  it('current Order By User method test', async () => {
    const result = await order.currentOrderByUser('1');
    const { user_id, status } = result;
    expect({ user_id, status }).toEqual({
      user_id: testOrder.user_id,
      status: testOrder.status,
    });
  });
});
