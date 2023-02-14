import { body, check, param } from 'express-validator';

export default class RecipeValidator {
    static recipeBody = () => [
        body('name').isString().trim().isLength({ min: 2, max: 40 }).notEmpty(),
        body('cookTime').isString().trim().notEmpty(),
        body('instructions').isString().trim().notEmpty(),
        body('ingredients').isArray({ min: 1 }),
        check('ingredients.*.name').isString().trim().notEmpty(),
        check('ingredients.*.amount').isString().trim().notEmpty(),
    ];

    static recipeId = () => param('id').trim().exists().notEmpty().isLength({ min: 24, max: 24 });
}