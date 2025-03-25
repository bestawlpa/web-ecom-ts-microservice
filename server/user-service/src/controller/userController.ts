//userController

import * as userService from '../service/userService'
import { Request, Response } from 'express';
import  User,{ IUser } from '../model/userModel'

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

export default { getAllUsers, createUser }