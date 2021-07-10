const { Router } = require("express");
const {getByName, addRecipe, getRecipeById} = require("../controllers/Recipe")

const router = Router()

router.get("/recipes", getByName)
router.get('/recipes/:id', getRecipeById)
router.post("/recipe", addRecipe)


module.exports = router;