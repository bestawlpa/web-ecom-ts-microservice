"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const router = express_1.default.Router();
router.get('/', productController_1.default.getAllProducts);
router.post('/', productController_1.default.createProduct);
router.get('/:id', productController_1.default.getProductById);
exports.default = router;
