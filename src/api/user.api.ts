import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { TokenController } from '../controllers/token.controller';

const express = require('express');
const bCrypt = require('bcrypt');

const { jwt: { secret } } = config;
const router = express.Router();

const { authenticateToken, updateTokens } = require('./../helpers/index');

router
    //user auth
    .post('/login', async (req: Request, res: Response) => {

        const { userEmail, userPassword } = req.body;

        try {
            const userController = new UserController();

            const user = await userController.findUser(userEmail);

            if (!user) {
                return res.status(404);
            }

            if (!(await bCrypt.compare(userPassword, user.userPassword))) {
                return res.sendStatus(401);
            }

            const tokens = await updateTokens(user?._id);

            return res.status(200).json({
                tokens, userEmail, _id: user?._id
            });

        } catch (e) {
            return res.status(400).json(e.message, e);
        }
    })
    //refresh tokens
    .post('/refresh', async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        let payload;

        try {
            payload = jwt.verify(refreshToken, secret);

            if (payload.type === 'refresh') {
                return res.status(400).json({ message: 'Invalid token' });
            }

        } catch (e) {

            if (e instanceof jwt.TokenExpiredError) {
                return res.status(400).json({ message: 'Token expired' });
            }

            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(400).json({ message: 'Invalid token' });
            }

        }

        try {

            const tokenController = new TokenController();

            const token = await tokenController.findToken(payload.id);

            if (!token) {
                return;
            }

            const tokens = await updateTokens(token.userId);

            return res.status(200).json({ tokens });

        } catch (e) {
            return res.status(400).json({ message: e.message, e });
        }
    })
    //register user
    .post('/register', async (req: Request, res: Response) => {
        const {
            userName,
            userLastName,
            userEmail,
            userPhone,
            userPassword
        } = req.body;

        try {
            const controller = new UserController();

            const user = await controller.register({
                userName,
                userLastName,
                userEmail,
                userPhone,
                userPassword
            });

            if (!user) {
                return res.status(400).json({
                    message: 'Check prompted data'
                });
            }

        } catch (e) {
            return res.status(400).json({
                message: 'Check prompted data',
                e
            });
        }
    })
    //get all users
    .get('/getAll', authenticateToken, async (req: Request, res: Response) => {
        try {

            const controller = new UserController();

            const users = await controller.getAll();

            if (!users?.length) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            return res.status(200).json(users);

        } catch (e) {
            return res.status(400).json({
                e
            });
        }
    })
    //edit user
    .put('/changePassword', authenticateToken, async (req: Request, res: Response) => {

        const {
            userEmail,
            userNewPassword
        } = req.body;

        try {

            const controller = new UserController();

            const user = await controller.changePassword({
                userEmail,
                userPassword: userNewPassword
            });

            if (!user) {
                return res.status(400).json({
                    error: 'Not found',
                });
            }

            return res.status(200).json(user);

        } catch (e) {
            return res.status(400).json({
                error: 'Error with updating exact user',
                e
            });
        }

    });


module.exports = router;
