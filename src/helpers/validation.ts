const jwt = require('jsonwebtoken');
import { IUser, IToken } from "../types/user.types";
const bCrypt = require('bcrypt');

export const checkTokenAssignee = (opts: IUser, token: IToken): boolean => {
    return token.userId === opts._id;
}

export const checkTokenExpiration = (token: string): any => {
    return jwt.verify(token, 'sigmatestkey');
}

export const compareHashedPasswords = async (pass1: string, opts: IUser): Promise<boolean> => {
    return await bCrypt.compare(pass1, opts.userPassword);
}

export const validateUserEmail = (opts: IUser): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
    return emailRegex.test(opts.userEmail);
}

export const validateUserName = (opts: IUser): boolean => {
    const nameRegex = /^([A-Za-z]{3,})$/gi
    return nameRegex.test(opts.userName);
}

export const validateUserPhone = (opts: IUser): boolean => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return phoneRegex.test(opts.userPhone)
} 