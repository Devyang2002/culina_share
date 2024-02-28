import express from "express";
import { createRecipe, getAllRecipe, getFavRecipes, getRecipe, getUserRecipes, markFavorite } from "../controller/recipes.js";

const router = express.Router();

router.post('/create', createRecipe);
router.get('/fetchAll', getAllRecipe);
router.get('/fetchUserRecipes/:user_id',getUserRecipes)
router.get('/fetchRecipe/:recipe_id',getRecipe)
router.get('/favoriteRecipes/:user_id',getFavRecipes)
router.post('/:recipe_id/markFavorite/:user_id', markFavorite)

export default router;