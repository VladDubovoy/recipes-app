import recipeService from "../services/recipe-service.js";
import { validationResult } from 'express-validator';
import ApiError from "../exceptions/api-error.js";
import RecipeDto from "../dtos/recipe-dto.js";

class RecipeController {
    async getRecipes(req, res, next ) {
        try {
            let recipes = await recipeService.getAllRecipes(req.user.id);
            if ( recipes.length > 0 ) {
                recipes = recipes.map(recipe => new RecipeDto(recipe));
            }
            return res.json(recipes);
        } catch(e) {
            next(e)
        }
    }

    async getRecipeById(req, res, next ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Param ID is not valid', errors.array()))
            }
            const { id } = req.params;
            const recipe = await recipeService.getRecipeById( id );
            if( recipe === null ) {
                return next(ApiError.BadRequest('Recipe is not found'));
            }
            return res.json(recipe);
        } catch(e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Recipe values are not valid', errors.array()))
            }
            const recipe = await recipeService.createRecipe(req.user.id, req.body);
            return res.json( new RecipeDto(recipe) );
        } catch(e) {
            next(e)
        }
    }

    async updateRecipe(req, res, next ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Recipe values are not valid', errors.array()))
            }
            const { id } = req.params;
            const recipe = await recipeService.updateRecipe(id, req.body);
            if( recipe === null ) {
                return next(ApiError.BadRequest('Recipe is not found'));
            }
            return res.json( new RecipeDto(recipe) );
        } catch(e) {
            next(e)
        }
    }

    async deleteRecipe(req, res, next ) {
        try {
            const errors = validationResult(req);
            if ( !errors.isEmpty() ) {
                return next(ApiError.BadRequest('Param ID is not valid', errors.array()))
            }
            const { id } = req.params;
            const recipe = await recipeService.deleteRecipeById( id );
            if( recipe === null ) {
                return next(ApiError.BadRequest('Recipe is not found'));
            }
            return res.json( new RecipeDto(recipe) );
        } catch(e) {
            next(e)
        }
    }
}

export default new RecipeController();