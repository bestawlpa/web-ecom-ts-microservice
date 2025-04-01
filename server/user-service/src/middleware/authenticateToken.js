"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // เพิ่มการจัดการข้อผิดพลาด เช่น เมื่อ token หมดอายุ
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        // ตรวจสอบว่า decoded เป็น JwtPayload
        if (typeof decoded === 'object' && decoded !== null) {
            // ตรวจสอบว่า JwtPayload มีฟิลด์ที่จำเป็นและแปลงเป็น IUser
            const userFromToken = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role,
            };
            // แค่เก็บข้อมูลที่จำเป็นจาก JwtPayload ใน req.user
            req.user = userFromToken; // แปลง Partial<IUser> ไปเป็น IUser
        }
        else {
            return res.status(403).json({ message: "Invalid token format" });
        }
        next();
    });
};
exports.default = authenticateToken;
