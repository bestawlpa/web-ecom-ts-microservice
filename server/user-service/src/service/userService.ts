// userService

import User, { IUser} from "../model/userModel";
import bcrypt from 'bcryptjs';


const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return await User.find()
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching users: ' + err.message);
    }
}

const createUser = async (userData: IUser) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error creating user: ' + err.message);
    }
}

const getUserForLogin = async (email: string): Promise<IUser  | null> => {
    try {
        return await User.findOne({email});
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching userById: ' + err.message);
    }
}

export { getAllUsers, createUser, getUserForLogin  }