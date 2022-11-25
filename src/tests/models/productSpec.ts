import { productModel, product } from '../../models/products';

const product = new productModel();

const testProdcut: product = {
  name: 'Test product',
  price: 10,
};

describe('Product Modle', () => {
  it('create method test', async () => {
    const result = await product.create(testProdcut);
    const { name, price } = result;
    expect({ name, price }).toEqual({
      name: testProdcut.name,
      price: testProdcut.price,
    });
  });

  it('index method test', async () => {
    const result = await product.index();
    const { name, price } = result[0];
    expect({ name, price }).toEqual({
      name: testProdcut.name,
      price: testProdcut.price,
    });
  });

  it('show method test', async () => {
    const result = await product.show('1');
    const { name, price } = result;
    expect({ name, price }).toEqual({
      name: testProdcut.name,
      price: testProdcut.price,
    });
  });
});
