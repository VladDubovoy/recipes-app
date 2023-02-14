import RecipeModel from "../models/recipe-model.js";
import ApiError from "../exceptions/api-error.js";

class RecipeService {
    async getAllRecipes(userId) {
        const recipes = await RecipeModel.find({ user: userId }) ?? [];
        return recipes;
    }

    async getRecipeById( recipeId ) {
        const recipe = await RecipeModel.findById( recipeId );
        if ( recipe === null ) {
            throw ApiError.BadRequest('Recipe is not found')
        }
        return recipe;
    }

    async createRecipe(userId, body) {
        const recipe = await RecipeModel.create({
            user: userId,
            ...body
        });
        return recipe;
    }

    async updateRecipe( recipeId, body ) {
        const recipe = await RecipeModel.findById( recipeId );
        if ( recipe === null ) {
            throw ApiError.BadRequest('Recipe is not found')
        }
        recipe.name = body.name;
        recipe.cookTime = body.cookTime;
        recipe.instructions = body.instructions;
        recipe.ingredients = body.ingredients;
        return await recipe.save();
    }

    async deleteRecipeById( recipeId ) {
        const recipe = await RecipeModel.findByIdAndDelete( recipeId );
        return recipe;
    }
}

export default new RecipeService();