import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true })

export default mongoose.model<IUser>('User',userSchema);
export { IUser }