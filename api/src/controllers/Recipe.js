const { Recipe, TypeDiet } = require("../db")
//const { BASE_URL } = require("../../constants")
const { v4: uuidv4 } = require('uuid');
//const { apikey } = process.env;
const axios = require('axios');
const { Sequelize } = require("sequelize")


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

const infoApi = async () => {
  const allApiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=469b0c76ee9c4576b19d44e490dc6552&number=100`);

  const infoNeeded = await allApiInfo.data.results.map((recipe) => {
    return {
      name: recipe.title,
      types: recipe.diets.map((diet) => { return { title: diet } }),
      healthLevel: recipe.healthScore,
      summary: recipe.summary,
      image: recipe.image,
      id: recipe.id,
      score: parseInt(recipe.spoonacularScore),
      steps: recipe.analyzedInstructions
    };
  });

  return infoNeeded;

};



// async function addRecipe(request, response, next) {
//   const id = uuidv4();
//   const recipeBody = { ...request.body, id };
//   try {
//     const createdRecipe = await Recipe.create(recipeBody);
//     //Formulario de como se carga la receta, despues la persona le dice que tipo de dieta.
//     //TypeDiets for each, dieta que coincida con la base de datos y setTypes
//     // genres.forEach(async (genre) => {
//     //     let genreThatMatchesDb = await Genre.findOne({
//     //       where: {
//     //         name: genre,
//     //       },
//     //     });
//     //     game.addGenre(genreThatMatchesDb);    El addtabla
//     //   });
//     return response.send(createdRecipe);
//   } catch (error) {
//     next(error);
//   }
// }

// const addRecipe = async (req, res)=> {



function addRecipe(req, res, next) {
  const { name, summary, score, healthScore, step2step, typeDiets } = req.body;
  Recipe.create({
    id: uuidv4(),
    name: name,
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
        message: 'Recipe created successfully',
      });
    })
    .catch((error) => next(error));
}




// async function addRecipe(req, res, next) {
//   try {
//     const {
//       name,
//       summary,
//       score,
//       healthScore,
//       step2step,
//       TypeDiet
//     } = req.body;
//     const createdRecipe = await Recipe.create({
//       name,
//       summary,
//       score,
//       healthScore,
//       step2step,
//       id: uuidv4()});

//     await page.setUser(user[0])
//     console.log(categories)
//     if (Array.isArray(categories)) {
//       categoriesResult = await Promise.all(
//         categories.map(value => Category.findByPk(value))
//       )
//     } else {
//       categoriesResult = await Promise.all([
//         Category.findByPk(parseInt(categories))
//       ])
//     }
//     await page.setCategories(categoriesResult)

//     res.redirect(page.route)
//   } catch (error) {

//   }
// }

async function getByName(req, res, next) {
  //return res.send("holis");
  //Hay un req query? Sino bai

  //[Sequelize.Op.iLike]
  //Que siempre incluya el model types
  //Fijarse que este vacio RecipeDB y sino pushear adentro la data
  //
  // console.log(name);
  //469b0c76ee9c4576b19d44e490dc6552
  try {
    const query = req.query.name;
    const results = {};
    const filteredRecipeDB = await Recipe.findAll({
      where: {
        name: {
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
    if (filteredRecipeDB) {
      results["results"] = filteredRecipeDB
    }
    const recipeApi = await infoApi();
    console.log(recipeApi);
    const filteredRecipeApi = await recipeApi.filter(recipe => recipe.name.includes(query)) //ver de hacer lowercase
    if (filteredRecipeApi) {
      if (!results.results) {
        results['results'] = filteredRecipeApi;
        res.send(results);
      } else {
        results.results = results.results.concat(filteredRecipeApi);
        res.send(results);
      };

    } else {

      if (!results.results) {
        res.status(404).json({ results: [{ error: 'No tenes nada de nada' }] })
      } else {
        res.json(results); //Aca solo envia los resultados de la Base de datos solo
      };
    };

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ results: { error: 'Error del servidor' } }); //Lo mas comun es que se quede sin llamadas la api
  };




  // Promise.all([recipeApi, recipeDB])
  //   .then((respuesta) => {
  //     let [recipeApiRes, recipeDBres] = respuesta;
  //     return res.send(
  //       res.send((recipeDBres).concat(recipeApiRes.data.results))
  //     )
  //   })
  //   .catch((err) => next(err));
}

async function getRecipeById(req, res) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=469b0c76ee9c4576b19d44e490dc6552`)
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
  getByName,
  addRecipe,
  getRecipeById,
};