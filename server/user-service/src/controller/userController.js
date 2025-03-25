"use strict";
//userController
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
const userService = __importStar(require("../service/userService"));
const userModel_1 = __importDefault(require("../model/userModel"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        const result = users.map((user) => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        }));
        res.status(200).json(result);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one uppercase letter.'
            });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one number.'
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }
        const existingUsername = yield userModel_1.default.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already in use. Please choose another one.' });
        }
        const existingEmail = yield userModel_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already in use. Please choose another one.' });
        }
        const user = yield userService.createUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            data: user
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message || 'Error creating user.' });
    }
});
exports.default = { getAllUsers, createUser };
