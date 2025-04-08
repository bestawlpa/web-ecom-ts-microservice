"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const cartService = __importStar(require("../service/cartService"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const getAllCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartService.getAllCarts();
        res.status(200).json(cart);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ message: 'Missing required fields or items' });
        return;
    }
    try {
        let updatedCart;
        for (const item of items) {
            const { productId, quantity } = item;
            if (!productId || !quantity) {
                res.status(400).json({ message: 'Invalid item data' });
                return;
            }
            updatedCart = yield cartService.createCart(userId, item);
        }
        res.status(200).json({ message: 'Items added to cart', cart: updatedCart });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`http://product-service:3001/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        const { product_name, images, price, quantity, stock } = yield response.json();
        return { product_name, images, price, quantity, stock };
    }
    catch (error) {
        const err = error;
        console.log(err);
    }
});
const getCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const cartItems = yield cartService.getCartByUserId(userId);
        if (!cartItems) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }
        const productDetails = yield Promise.all(cartItems.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield getProductById(item.productId.toString());
            return Object.assign(Object.assign({}, item), { product });
        })));
        res.status(200).json(Object.assign(Object.assign({}, cartItems), { items: productDetails }));
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
// const getProductById = async (productId: string) => {
//     try {
//         const response = await fetch(`http://product-service:3001/api/products/${productId}`);
//         if (!response.ok) throw new Error('Product not found');
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return null; // ส่งคืน null หากเกิดข้อผิดพลาด
//     }
// };
// const getCartByUserId = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         const cartItems = await cartService.getCartByUserId(userId);
//         if (!cartItems) {
//             return res.status(404).json({ message: 'No cart found for this user' });
//         }
//         // ดึงข้อมูลสินค้าทั้งหมดในครั้งเดียว
//         const productDetails = await Promise.all(
//             cartItems.items.map(async (item) => {
//                 const product = await getProductById(item.productId.toString());
//                 return product ? { ...item, product } : null; // ส่งคืนข้อมูลสินค้า
//             })
//         );
//         // กรอง null ออกจาก productDetails
//         const filteredProductDetails = productDetails.filter(item => item !== null);
//         res.status(200).json({
//             ...cartItems,
//             items: filteredProductDetails,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
const removeItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, itemId } = req.params;
    if (!userId || !itemId) {
        return res.status(400).json({ message: 'Missing userId or itemId' });
    }
    try {
        const updatedCart = yield cartService.removeItemFromCart(userId, itemId);
        res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.default = { getAllCarts, createCart, getCartByUserId, removeItemFromCart };
