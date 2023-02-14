import $api from "../http";

export default class RecipeService {
    static async fetchRecipes() {
        return $api.get('/recipes');
    }

    static async createRecipe(recipe) {
        return $api.post('/recipes', recipe);
    }

    static async updateRecipe(id, newRecipe) {
        return $api.put(`/recipes/${id}`, newRecipe);
    }

    static async deleteRecipe(id) {
        return $api.delete(`/recipes/${id}` );
    }

}