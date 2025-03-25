"use strict";
// userService
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
exports.createUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.default.find();
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching users: ' + err.message);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
        const user = new userModel_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        yield user.save();
        return user;
    }
    catch (error) {
        const err = error;
        throw new Error('Error creating user: ' + err.message);
    }
});
exports.createUser = createUser;
