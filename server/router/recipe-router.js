import { Router } from 'express';
import authMiddleware from "../middlewares/auth-middleware.js";
import recipeController from "../controllers/recipe-controller.js";
import RecipeValidator from "../validators/recipe-validator.js";
const recipeRouter = new Router();

recipeRouter.get('/recipes', authMiddleware, recipeController.getRecipes)
recipeRouter.get('/recipes/:id', authMiddleware, RecipeValidator.recipeId(), recipeController.getRecipeById)
recipeRouter.post('/recipes', authMiddleware, RecipeValidator.recipeBody(), recipeController.create)
recipeRouter.put('/recipes/:id', authMiddleware, RecipeValidator.recipeId(), RecipeValidator.recipeBody(), recipeController.updateRecipe)
recipeRouter.delete('/recipes/:id', authMiddleware, RecipeValidator.recipeId(), recipeController.deleteRecipe)


export default recipeRouter;