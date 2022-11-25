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
const products_1 = require("../../models/products");
const product = new products_1.productModel();
const testProdcut = {
    name: 'Test product',
    price: 10,
};
describe('Product Modle', () => {
    it('create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.create(testProdcut);
        const { name, price } = result;
        expect({ name, price }).toEqual({
            name: testProdcut.name,
            price: testProdcut.price,
        });
    }));
    it('index method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.index();
        const { name, price } = result[0];
        expect({ name, price }).toEqual({
            name: testProdcut.name,
            price: testProdcut.price,
        });
    }));
    it('show method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.show('1');
        const { name, price } = result;
        expect({ name, price }).toEqual({
            name: testProdcut.name,
            price: testProdcut.price,
        });
    }));
});
