export default class RecipeDto {
    name;
    cookTime;
    instructions;
    ingredients;

    constructor(model) {
        this.name = model.name;
        this.cookTime = model.cookTime;
        this.instructions = model.instructions;
        this.ingredients = model.ingredients.map(ingredient => new IngredientDto(ingredient) );
    }
}

class IngredientDto {
    name;
    amount;

    constructor(model) {
        this.name = model.name;
        this.amount = model.amount;
    }
}
