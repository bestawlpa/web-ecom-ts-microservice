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
exports.getProductById = exports.createProduct = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield productModel_1.default.find().select('_id product_name images price ratings stock');
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching products: ' + err.message);
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield productModel_1.default.insertMany(productData);
    }
    catch (error) {
        const err = error;
        throw new Error('Error creating product: ' + err.message);
    }
});
exports.createProduct = createProduct;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield productModel_1.default.findById(id);
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching product by ID: ' + err.message);
    }
});
exports.getProductById = getProductById;
