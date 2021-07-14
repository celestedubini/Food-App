require('dotenv').config();
const { Recipe, TypeDiet } = require("../db")
//const { BASE_URL } = require("../../constants")
const { v4: uuidv4 } = require('uuid');
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
const { Sequelize } = require("sequelize")


// const infoApi = async () => {
//   const allApiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);

//   const infoNeeded = await allApiInfo.data.results.map((recipe) => {
//     return {
//       name: recipe.title,
//       types: recipe.diets.map((diet) => { return { title: diet } }),
//       healthScore: recipe.healthScore,
//       summary: recipe.summary,
//       image: recipe.image,
//       id: recipe.id,
//       score: parseInt(recipe.spoonacularScore),
//       step2step: recipe.analyzedInstructions
//     };
//   });

//   return infoNeeded;

// };

function addRecipe(req, res, next) {
  const { title, summary, score, healthScore, step2step, typeDiets } = req.body;
  if (!title || !summary) return res.send({ error: 500, message: "Necesitas ponerle minimo un name y un summary en el body reina" });
  Recipe.create({
    id: uuidv4(),
    title: title,
    summary: summary,
    score: score,
    healthScore: healthScore,
    step2step: step2step,
  })
    .then((recipeCreated) => {
      return recipeCreated.addTypeDiets(typeDiets);
    })
    .then(newRecipe => {
      return res.json({
        message: 'Creaste una Receta!',
      });
    })
    .catch((error) => next(error));
}

async function getAllRecipes(req, res, next) {
  const query = req.query.name;
  if (!query) {
    const recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);
    const recipeDB = Recipe.findAll();
    Promise.all([recipeApi, recipeDB])
      .then((respuesta) => {
        let [recipeApiRes, recipeDBres] = respuesta;
        return res.send(
          recipeDBres.concat(recipeApiRes.data.results)
        );
      })
      .catch((err) => next(err));
  } else {
      const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);
      const filteredRecipeApi = await recipeApi.data.results.filter(recipe => recipe.title.includes(query))
      const recipeDB = Recipe.findAll({
              where: {
                title: {
                  [Sequelize.Op.iLike]: `%${query}%` //%${} con esto se fija que en alguna parte de todo el string este eso
                },
              },
              include: {
                model: TypeDiet,
                attributes: ["name"],
                through: {
                  attributes: []
                }
              }
            });
    Promise.all([filteredRecipeApi, recipeDB])
      .then((respuesta) => {
        let [filteredRecipeApi, recipeDBres] = respuesta;
        return res.send(
          recipeDBres.concat(filteredRecipeApi)
        );
      })
      .catch((err) => next(err));
}}

async function getRecipeById(req, res) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${YOUR_API_KEY}`)
    res.json(response.data)
  } catch (error) {
    if (error.response?.status === 404) {
      Recipe.findByPk(req.params.id).then(recipe => {
        if (recipe) return res.json(recipe)
        return res.sendStatus(404)
      })
    } else {
      res.status(500).json({ error: 'Ups!!! 😱' })
    }
  }
}

module.exports = {
  //getByName,
  addRecipe,
  getRecipeById,
  getAllRecipes
};