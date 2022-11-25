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
const orders_1 = require("../models/orders");
const dotenv_1 = __importDefault(require("dotenv"));
const authentication_1 = require("../middleware/authentication");
dotenv_1.default.config();
const order = new orders_1.orderModel();
const currentOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const o = yield order.currentOrderByUser(userId);
        res.json(o);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOrder = yield order.create(p);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const od = {
            order_id: parseInt(req.params.id),
            product_id: parseInt(req.body.product_id),
            quantity: parseInt(req.body.quantity),
        };
        if (!od.order_id || !od.product_id || !od.quantity) {
            return res
                .status(400)
                .send('Error, missing or wrong parameters. (productId , quantity , orderId ) are  required');
        }
        const p = yield order.addProduct(od);
        res.json(p);
    }
    catch (error) {
        res.status(500);
        res.json(`cannot add product : ${error}`);
    }
});
const orderRoutes = (app) => {
    app.post('/orders', authentication_1.verifyToken, create);
    app.get('/orders/:userId', authentication_1.verifyToken, currentOrderByUser);
    app.post('/orders/:id/products', authentication_1.verifyToken, addProduct);
};
exports.default = orderRoutes;
