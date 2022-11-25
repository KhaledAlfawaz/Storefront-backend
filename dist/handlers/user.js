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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authentication_1 = require("../middleware/authentication");
dotenv_1.default.config();
const user = new users_1.userModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const u = yield user.show(id);
        res.json(u);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        if (!u.firstname || !u.lastname || !u.password) {
            return res
                .status(400)
                .send('Error, missing or wrong parameters. (firstname , lastname ,password) are  required');
        }
        const newUser = yield user.create(u);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(`cannot create user ${error}`);
    }
});
const usersRoutes = (app) => {
    app.get('/users', authentication_1.verifyToken, index);
    app.get('/users/:id', authentication_1.verifyToken, show);
    app.post('/users', create);
};
exports.default = usersRoutes;
