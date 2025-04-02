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
exports.getCartByUserId = exports.createCart = exports.getAllCarts = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const mongoose_1 = require("mongoose");
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cartModel_1.default.find();
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching carts: ' + err.message);
    }
});
exports.getAllCarts = getAllCarts;
const createCart = (userId, item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productObjectId = new mongoose_1.Types.ObjectId(item.productId);
        const cart = yield cartModel_1.default.findOne({ userId });
        if (!cart) {
            const newCart = new cartModel_1.default({
                userId,
                items: [
                    {
                        productId: productObjectId,
                        quantity: item.quantity
                    }
                ],
            });
            return yield newCart.save();
        }
        const existingItem = cart.items.find(i => i.productId.toString() === productObjectId.toString());
        if (existingItem) {
            existingItem.quantity += item.quantity;
        }
        else {
            cart.items.push({ productId: productObjectId, quantity: item.quantity });
        }
        return yield cart.save();
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching carts: ' + err.message);
    }
});
exports.createCart = createCart;
const getCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userObjectId = new mongoose_1.Types.ObjectId(userId);
        const cart = yield cartModel_1.default.findOne({ userId: userObjectId }).lean();
        console.log('Cart:', cart);
        return cart;
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching carts: ' + err.message);
    }
});
exports.getCartByUserId = getCartByUserId;
