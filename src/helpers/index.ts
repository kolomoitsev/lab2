import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserControllerAction } from '../types/user.types';
import { UserController } from '../controllers/user.controller';

const { v4: uuidV4 } = require('uuid');

const tokenModel = require('../models/token.model');

const { jwt: { secret, tokens } } = config;

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    };

    const options = { expiresIn: tokens.access.expiresIn };

    return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
    const payload = {
        id: uuidV4(),
        type: tokens.refresh.type
    };

    const options = { expiresIn: tokens.refresh.expiresIn };

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    };
};

const replaceToken = async (tokenId, userId) => {
    await tokenModel
        .findOneAndRemove({ userId })
        .exec()
        .then(async () => {
            await tokenModel.create({
                tokenId,
                userId
            });
        });
};

export const verifyUserInstance = (action: UserControllerAction) => {
    return (req: Request, res: Response) => {
        const consumerInstance = new UserController();
        action(req, res, consumerInstance)
    }
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, secret);
        if (payload.type !== 'access') {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Expired token' });
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    next();
};

const updateTokens = (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();

    return replaceToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token
        }))
        .catch((e) => console.log(e));
};

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
    replaceToken,
    updateTokens
};
