import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const User = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true
        },
        userLastName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            unique: true,
            required: true
        },
        userPhone: {
            type: String,
            unique: true,
            required: true
        },
        userPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const UserModel = model<IUser>('User', User);

module.exports = UserModel;
