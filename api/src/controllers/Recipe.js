const { Recipe } = require("../db")
//const { BASE_URL } = require("../../constants")
const { v4: uuidv4 } = require('uuid');
//const { apikey } = process.env;
const axios = require('axios');


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
    const recipeBody = { ...request.body, id };
    try {
        const createdRecipe = await Recipe.create(recipeBody);
        return response.send(createdRecipe);
    } catch (error) {
        next(error);
    }
}

// function getAllRecipes(req, res, next) {
//     const recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=469b0c76ee9c4576b19d44e490dc6552`);
//     const recipeDB = Recipe.findAll();
//     Promise.all([recipeApi, recipeDB])
//         .then((res) => {
//             let [recipeApiRes, recipeDBres] = res;
//             return res.send((recipeDBres).concat(recipeApiRes.data));
//         })
//         .catch ((err) => next(err));
// }

function getAllRecipes(req, res, next) {
	const recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=469b0c76ee9c4576b19d44e490dc6552`);
	const recipeDB = Recipe.findAll();
	Promise.all([recipeApi, recipeDB])
		.then((respuesta) => {
			let [recipeApiRes, recipeDBres] = respuesta;
			return res.send(
				res.send((recipeDBres).concat(recipeApiRes.data))
        )})
		.catch((err) => next(err));
}

module.exports = {
    getAllRecipes,
    addRecipe
};