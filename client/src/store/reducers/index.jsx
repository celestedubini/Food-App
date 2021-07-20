import { GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_DETAIL, GET_TYPES, ASC, DESC, MINMAX, MAXMIN, FILTER_BY_DIET } from "../actions/RecipesActions";

const INITIAL_STATE = {
    recipes: [],
    recipeDetail: [],
    diets: [],
    recipesFiltered: []
};

// function aux(recipes, types) {
//     console.log(types)
//     let recipesFilter = [];
//     if (types === "All") {
//         return recipesFilter;
//     } else {
//         recipesFilter = recipes.filter(e => e.diets?.map(e => e.name.toLowerCase()).includes(types))
//     }
//     return recipesFilter
// }

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesFiltered: action.payload
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

// const aux = (recipes, types) => {
//                 console.log(types)
                // let recipesFilter = [];
                // if (types === "All") {
                //     return recipesFilter;
                // } else {
                //     recipesFilter = recipes.filter(e => e.diets?.map(e => e.name.toLowerCase()).includes(types))
                // }
                // return recipesFilter
            // }



        case FILTER_BY_DIET:
            console.log(action.payload)
            if (action.payload === 'all') {
                return {
                    ...state,
                    recipes: state.recipesFiltered
                }
            };
            let recipesFilter = [];
            recipesFilter = state.recipes.filter(e => e.diets?.map(e => e.name.toLowerCase()).includes(action.payload))
            console.log(recipesFilter)
            return {
                ...state, recipes: recipesFilter

            }

            



        default:
            return { ...state };
    }
}

export default reducer;







