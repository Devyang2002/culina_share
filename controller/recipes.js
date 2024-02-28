import ErrorHandler from "../error/errors.js";
import { recipes } from "../models/recipeSchema.js";
import { users } from "../models/userSchema.js";


export const createRecipe = async (req, res, next) =>{
    const {recipe_name , recipe_img, cooking_time, category, ingredients, instructions, user_name, user_id} = req.body;

    if(!recipe_name || !recipe_img || !cooking_time || !category || !ingredients || !instructions || !user_name || !user_id){
        return next(new ErrorHandler("Please fill all the particulars!",400));
    }
    try{
        const newRecipe = new recipes({ recipe_name , recipe_img, cooking_time, category, ingredients, instructions, user_name, user_id});
        const savedRecipe = await newRecipe.save();

        const recipeId = savedRecipe._id;

        const user = await users.findById(user_id);
        if (user) {
            user.recipes.push(recipeId);
            await user.save();
        }


        // update recipe id in users record


        res.status(200).json({
            success: true,
            message: "Submitted successfully"
        });
    } catch(error){
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }
};

export const getAllRecipe = async (req, res, next) =>{

    try {
        const allRecipes = await recipes.find();
        return res.status(200).json({
            success: true,
            message: "recipes fetched successfully",
            data: allRecipes
        });
    } catch (error) {
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }

    
}

export const getUserRecipes = async (req, res, next) =>{
    const {user_id} = req.params;

    try {
        const user = await users.findById(user_id);
        const userRecipes = [];

        for (const recipeId of user.recipes) {
            const recipe = await recipes.findById(recipeId);
            userRecipes.push(recipe);
        }

        return res.status(200).json({
            success: true,
            message: "recipes fetched successfully",
            data: userRecipes
        });
    } catch (error) {
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }
}

export const getRecipe = async (req, res, next) => {
    const { recipe_id } = req.params;

    try {
        const recipe = await recipes.findById(recipe_id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Recipe fetched successfully",
            data: recipe
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "), 400));
        }
        return next(error);
    }
};


export const getFavRecipes = async (req, res, next) =>{
    const {user_id} = req.params;

    try {
        const user = await users.findById(user_id);
        const userFavRecipes = [];

        for (const recipeId of user.favoriteRecipes) {
            const recipe = await recipes.findById(recipeId);
            userFavRecipes.push(recipe);
        }

        return res.status(200).json({
            success: true,
            message: "recipes fetched successfully",
            data: userFavRecipes
        });
    } catch (error) {
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }
}

export const markFavorite = async (req, res, next) =>{
    const {user_id,recipe_id} = req.params;

    try {
        const user = await users.findById(user_id);
        // for (const recipeId of user.favoriteRecipes) {
        //     const recipe = await recipes.findById(recipeId);
        //     userFavRecipes.push(recipe);
        // }
        if (user) {
            if (!(user.favoriteRecipes.includes(recipe_id))) {
                user.favoriteRecipes.push(recipe_id);
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: "recipes fetched successfully",
                });
            }
        }

        return res.status(409).json({
            success: false,
            message: "Favorite already exists.",
        });
    } catch (error) {
        if(error.name === "ValidationError"){
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(" , "),400));
        }
        return next(error)
    }

}