// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
// const SECRET_KEY = process.env.SECRET_KEY as string;
// import { IUser } from '../model/userModel';

// interface AuthenticatedRequest extends Request {
//     user?: IUser;
// }

// const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const token = req.cookies.jwtToken;
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
//         if (err) {
//             // เพิ่มการจัดการข้อผิดพลาด เช่น เมื่อ token หมดอายุ
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: "Token expired" });
//             }
//             return res.status(403).json({ message: "Forbidden: Invalid token" });
//         }
//         req.user = user; 
//         next();
//     });
// }

// export default authenticateToken;

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY as string;
import { IUser } from '../model/userModel';

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
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
            const userFromToken: Partial<IUser> = {
                id: decoded.sub as string,  // สมมุติว่า 'sub' เป็น id ของผู้ใช้
                username: decoded.username as string,
                email: decoded.email as string,
                role: decoded.role as string,
            };

            // แค่เก็บข้อมูลที่จำเป็นจาก JwtPayload ใน req.user
            req.user = userFromToken as IUser; // แปลง Partial<IUser> ไปเป็น IUser
        } else {
            return res.status(403).json({ message: "Invalid token format" });
        }

        next();
    });
}

export default authenticateToken;
