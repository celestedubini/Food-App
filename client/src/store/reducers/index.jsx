import { GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_DETAIL, GET_TYPES, ASC, DESC, MINMAX, MAXMIN, FILTER_BY_DIET } from "../actions/RecipesActions";

const INITIAL_STATE = {
    recipes: [],
    recipeDetail: [],
    diets: [],
    recipesFiltered: []
};

function aux(recipes, types) {
    let recipesFilter = [];
    if (types === "All Types") {
        return recipes;
    } else {
        recipesFilter = recipes.filter(e => e.diets ? e.diets.includes(types) : recipes.filter(e => e.diets && e.diets.map(e => e.name === types)))
    }
    return recipesFilter
}

// function filterTemperament(breeds, temperament) {
//     let filteredBreeds = []

//     if (temperament === 'All Temperaments') return breeds
//     else {
//         filteredBreeds = breeds.filter(e => e.temperament ? e.temperament.includes(temperament)
//             : breeds.filter(e => e.temperaments && e.temperaments.map(e => e.name === temperament)))
//         // if (typeof temperament === 'string') temperament.split(,)
//     }
//     return filteredBreeds

// }

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state, recipes: action.payload,
            };
        case GET_RECIPES_BY_NAME: return {
            ...state, recipes: action.payload,
        };
        case GET_RECIPE_DETAIL: return {
            ...state, recipeDetail: action.payload,
        }
        case GET_TYPES: return { ...state, diets: action.payload }
        case ASC:
            return {
                ...state,
                recipes: state.recipes
                    .filter((b) => b.title !== null)
                    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)),
            };

        case DESC:
            return {
                ...state,
                recipes: state.recipes
                    .filter((b) => b.title !== null)
                    .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)),
            };
        case MINMAX:
            return {
                ...state,
                recipes: state.recipes.filter((b) => b.spoonacularScore !== null).sort((a, b) => (a.spoonacularScore > b.spoonacularScore ? 1 : -1)),
            };
        case MAXMIN:
            return {
                ...state,
                recipes: state.recipes.filter((b) => b.spoonacularScore !== null).sort((a, b) => (a.spoonacularScore < b.spoonacularScore ? 1 : -1)),
            };
        case FILTER_BY_DIET:
            return {
                ...state, recipesFiltered: aux(state.recipes, action.payload)

            }
        default:
            return { ...state };
    }
}

export default reducer;







