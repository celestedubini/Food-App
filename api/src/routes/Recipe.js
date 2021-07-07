const { Router } = require("express");
const {getAllRecipes, addRecipe} = require("../controllers/Recipe")

const router = Router()

router.get("/recipes", getAllRecipes)
router.post("/recipe", addRecipe)

module.exports = router;