"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../controller/cartController"));
// import authenticateToken from '../middleware/authenticateToken';
const router = express_1.default.Router();
router.get('/carts', cartController_1.default.getAllCarts);
router.post('/addCart', cartController_1.default.createCart);
exports.default = router;
