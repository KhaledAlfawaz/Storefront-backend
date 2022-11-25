"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const users_1 = require("../../models/users");
const order = new orders_1.orderModel();
const product = new products_1.productModel();
const user = new users_1.userModel();
const testOrder = {
    user_id: 1,
    status: 'active',
};
const testProdcut = {
    name: 'Test product',
    price: 10,
};
const testUser = {
    firstname: 'Test firstname',
    lastname: 'Test lastname',
    password: 'testpassword',
};
const testOrderProduct = {
    quantity: 10,
    product_id: 1,
    order_id: 1,
};
describe('Order Modle', () => {
    // I had to add product and user before all so i dont get errors
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield product.create(testProdcut);
        yield user.create(testUser);
    }));
    it('create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.create(testOrder);
        const { user_id, status } = result;
        expect({ user_id, status }).toEqual({
            user_id: testOrder.user_id,
            status: testOrder.status,
        });
    }));
    it('add porduct method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.addProduct(testOrderProduct);
        const { quantity, product_id, order_id } = result;
        expect({ quantity, product_id, order_id }).toEqual({
            quantity: testOrderProduct.quantity,
            product_id: testOrderProduct.product_id,
            order_id: testOrderProduct.order_id,
        });
    }));
    it('current Order By User method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.currentOrderByUser('1');
        const { user_id, status } = result;
        expect({ user_id, status }).toEqual({
            user_id: testOrder.user_id,
            status: testOrder.status,
        });
    }));
});
