export default class RecipeDto {
    id;
    name;
    cookTime;
    instructions;
    ingredients;

    constructor(model){
        this.id = model._id;
        this.name = model.name;
        this.cookTime = model.cookTime;
        this.instructions = model.instructions;
        this.ingredients = model.ingredients.map(ingredient => new IngredientDto(ingredient) );
    }
}

class IngredientDto {
    id;
    name;
    amount;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.amount = model.amount;
    }
}
