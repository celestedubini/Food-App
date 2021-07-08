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
        //TypeDiets for each, dieta que coincida con la base de datos
        // genres.forEach(async (genre) => {
        //     let genreThatMatchesDb = await Genre.findOne({
        //       where: {
        //         name: genre,
        //       },
        //     });
        //     game.addGenre(genreThatMatchesDb);    El addtabla
        //   });
        return response.send(createdRecipe);
    } catch (error) {
        next(error);
    }
}


function getAllRecipes(req, res, next) {
	const recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=469b0c76ee9c4576b19d44e490dc6552`);
	const recipeDB = Recipe.findAll();
	Promise.all([recipeApi, recipeDB])
		.then((respuesta) => {
			let [recipeApiRes, recipeDBres] = respuesta;
			return res.send(
				res.send((recipeDBres).concat(recipeApiRes.data.results))
        )})
		.catch((err) => next(err));
}

async function getRecipeById(req, res) {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=469b0c76ee9c4576b19d44e490dc6552`)
      res.json(response.data)
    } catch (error) {
      if(error.response?.status === 404) {
        Recipe.findByPk(req.params.id).then(recipe => {
          if(recipe) return res.json(recipe)
          return res.sendStatus(404)
        })
      } else {
        res.status(500).json({ error: 'Ups!!! 😱' })
      }
    }
  }

module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipeById
};