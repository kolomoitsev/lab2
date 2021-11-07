import { IChangePassword, IUser } from '../types/user.types';

const userModel = require('./../models/user.model');
const bCrypt = require('bcrypt');


interface IUserController {
    findUser: (userEmail: string) => Promise<IUser>;
    refreshToken: () => void;
    register: (opts: IUser) => Promise<IUser>;
    getAll: () => Promise<Array<IUser>>;
    changePassword: (opts: IChangePassword) => Promise<IUser>;
}

export class UserController implements IUserController {
    public async findUser(userEmail: string): Promise<IUser> {
        return userModel.findOne({
            userEmail
        });
    };

    public async changePassword(opts: IChangePassword): Promise<IUser> {
        return userModel.findOneAndUpdate({
            userEmail: opts.userEmail
        }, {
            userPassword: await bCrypt.hash(opts.userPassword, 10)
        })
            .select('-userPassword');

    }

    public async getAll(): Promise<Array<IUser>> {
        return userModel.find({})
            .select('-userPassword');
    }

    public async refreshToken(): Promise<void> {

    }

    public async register(opts: IUser): Promise<IUser> {

        let user = new userModel({
            userName: opts.userName,
            userLastName: opts.userLastName,
            userEmail: opts.userEmail,
            userPhone: opts.userPhone,
            userPassword: await bCrypt.hash(opts.userPassword, 10)
        });

        await user.save();
        user = user.toObject();

        delete user.userPassword;
        return user;
    }
}
