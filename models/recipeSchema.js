import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipe_name: {
        type:String,
        required: true,
    },
    recipe_img: {
        type:String,
        required: true,
    },
    cooking_time: {
        type:Number,
        required: true,
    },
    category: {
        type:String,
        required: true,
    },
    ingredients: {
        type:String,
        required: true,
    },
    instructions: {
        type:String,
        required: true,
    },
    user_name:{
        type: String,
        ref: 'users'
    },
    user_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
},
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
)

export const recipes = mongoose.model("recipes",recipeSchema);