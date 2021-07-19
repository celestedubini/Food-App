import { GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_DETAIL, GET_TYPES, ASC, DESC, MINMAX, MAXMIN } from "../actions/RecipesActions";

const INITIAL_STATE = {
    recipes: [],
    recipeDetail: [],
    typeDiets: []
};

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
        case GET_TYPES: return { ...state, typeDiets: action.payload }
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
        default:
            return { ...state };
    }
}

export default reducer;







