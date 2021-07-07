const { Recipe } = require("../db")
//const {BASE_URL} = require("..")
const {v4: uuidv4} = require('uuid');


// async function addRecipe(req, res, next) {
//     const id = uuidv4();
//     const recipe = {...request.body, id};
//     if (!recipe) return res.send({ error: 500, message: "Necesitas enviar algo en el body reina" })
//     try {
//         const createdRecipe = await Recipe.create(recipe);
//         return res.send(createdRecipe);
//     } catch (error) {
//         next(error);
//     }

// }

async function addRecipe(request, response, next) {
	const id = uuidv4();
	const recipeBody = {...request.body, id};
	try {
		const createdRecipe = await Recipe.create(recipeBody);
		return response.send(createdRecipe);
	} catch (error) {
		next(error);
	}
}

function getAllRecipes(req, res, next) {
    //const recipeApi = axios.get(`$`)
    return Recipe.findAll()
        .then((recipes) => res.send(recipes))
        .catch(err => next(err));
}

module.exports = {
    getAllRecipes,
    addRecipe
};