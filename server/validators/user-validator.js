import { body } from 'express-validator';

export default class UserValidator {
    static userBody = () => [
        body('email').notEmpty().isEmail(),
        body('password').isLength({ min: 4, max: 32 }),
    ];
}