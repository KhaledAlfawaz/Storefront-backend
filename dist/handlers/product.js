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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const authentication_1 = require("../middleware/authentication");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const product = new products_1.productModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product.index();
    res.json(products);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const p = yield product.show(id);
        res.json(p);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = yield product.create(p);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authentication_1.verifyToken, create);
};
exports.default = productRoutes;
