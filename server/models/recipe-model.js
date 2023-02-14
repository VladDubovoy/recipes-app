import { Schema, model} from 'mongoose';

const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 40,
        default: '',
    },
    cookTime: {
        type: String,
        required: true,
        default: '',
    },
    instructions: {
        type: String,
        required: true,
        default: '',
    },
    ingredients: [ {
        name: {
            type: String,
            required: true,
            default: '',
        },
        amount: {
            type: String,
            required: true,
            default: '',
        },
    } ],
})
const RecipeModel = model('Recipe', RecipeSchema);
export default RecipeModel;