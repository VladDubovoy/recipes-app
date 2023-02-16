import userService from '../services/user-service.js';
import { validationResult } from 'express-validator';
import ApiError from "../exceptions/api-error.js";

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Email or password is not valid', errors.array()))
            }
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.json(userData);
        } catch(e){
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.json(userData);
        } catch(e){
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res.json(token);
        } catch(e){
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch(e){
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken)
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch(e){
            next(e)
        }
    }

    async updateTheme(req, res, next) {
        try {
            const { isDarkTheme } = req.body;
            const user = await userService.updateTheme(isDarkTheme, req.user.email);
            return res.json( { isDarkTheme: user.isDarkTheme } );
        } catch(e) {
            next(e)
        }
    }

    async getTheme(req, res, next) {
        try {
            const user = await userService.getTheme(req.user.email);
            return res.json( { isDarkTheme: user.isDarkTheme } );
        } catch(e) {
            next(e)
        }
    }



}

export default new UserController();