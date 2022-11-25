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
exports.orderModel = void 0;
const database_1 = __importDefault(require("../database"));
class orderModel {
    currentOrderByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`cannot show order ${error}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status , user_id) VALUES($1 , $2) RETURNING *';
                const result = yield conn.query(sql, [o.status, o.user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`cannot create order ${error}`);
            }
        });
    }
    addProduct(od) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity , product_id , order_id) VALUES ($1 , $2 , $3) RETURNING *';
                const result = yield conn.query(sql, [
                    od.quantity,
                    od.product_id,
                    od.order_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`cannot add product ${od.product_id} to order ${od.order_id} : ${error}`);
            }
        });
    }
}
exports.orderModel = orderModel;
