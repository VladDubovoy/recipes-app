import { Router } from 'express';
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import UserValidator from "../validators/user-validator.js";
const userRouter = new Router();

userRouter.post('/registration', UserValidator.userBody(), userController.registration )
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/users', authMiddleware, userController.getUsers)
userRouter.post('/theme', authMiddleware, userController.updateTheme)
userRouter.get('/theme', authMiddleware, userController.getTheme)

export default userRouter;