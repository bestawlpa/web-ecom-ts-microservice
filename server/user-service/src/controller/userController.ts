//userController

import * as userService from '../service/userService'
import { Request, Response } from 'express';
import  User,{ IUser } from '../model/userModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const users = await userService.getAllUsers();
        const result = users.map((user: IUser) => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        }))
        res.status(200).json(result)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}

const createUser = async (req: Request, res: Response) => {
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

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already in use. Please choose another one.' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already in use. Please choose another one.' });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            data: user
        }); 

    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error creating user.' });
    }
};

const getUserForLogin = async (req:Request ,res:Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userService.getUserForLogin(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token  = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email, 
                role: user.role 
            }, SECRET_KEY,
            { 
                expiresIn: '24h' 
            }
        )

        res.cookie('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error fetch user.' });
    }
};

const getUserProfile = async (req:Request, res:Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        console.log('req.user', req.user);
        const userId = req.user.id;
        const user = await userService.getUserProfile(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        res.status(200).json(result);
    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error fetch user.' });
    }
}


export default { getAllUsers, createUser, getUserForLogin, getUserProfile }