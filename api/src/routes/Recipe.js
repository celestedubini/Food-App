const { Router } = require("express");
const {getAllRecipes, addRecipe, getRecipeById} = require("../controllers/Recipe")

const router = Router()

router.get('/recipes/:id', getRecipeById)
router.get("/recipes", getAllRecipes)
router.post("/recipe", addRecipe)


module.exports = router;