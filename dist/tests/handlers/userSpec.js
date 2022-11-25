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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('User endpoint testing', () => {
    const user = {
        firstname: 'Test firstname',
        lastname: 'Test lastname',
        password: 'password123',
    };
    let token;
    it('test user create endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.post('/users').send(user);
        token = res.body;
        expect(res.statusCode).toBe(200);
    }));
    it('test user to not create endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.post('/users').send({ firsname: 'wrong' });
        expect(res.statusCode).toBe(400);
    }));
    it('test user show endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
    it('test user index endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
