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
const users_1 = require("../../models/users");
const user = new users_1.userModel();
const testUser = {
    firstname: 'Test firstname',
    lastname: 'Test lastname',
    password: 'testpassword',
};
describe('User Modle', () => {
    it('create method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create(testUser);
        const { firstname, lastname } = result;
        expect({ firstname, lastname }).toEqual({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
        });
    }));
    it('index method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        const { firstname, lastname } = result[0];
        expect({ firstname, lastname }).toEqual({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
        });
    }));
    it('show method test', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show('1');
        const { firstname, lastname } = result;
        expect({ firstname, lastname }).toEqual({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
        });
    }));
});
