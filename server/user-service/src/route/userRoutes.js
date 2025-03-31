"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
router.get('/users', userController_1.default.getAllUsers);
router.post('/register', userController_1.default.createUser);
router.post('/login', userController_1.default.getUserForLogin);
router.get('/profile', authenticateToken_1.default, userController_1.default.getUserProfile);
exports.default = router;
