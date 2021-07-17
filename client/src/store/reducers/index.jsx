import { GET_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPE_DETAIL, GET_TYPES } from "../actions/RecipesActions";

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
        case GET_TYPES: return {...state, typeDiets: action.payload}
        default:
            return { ...state };
    }
}

export default reducer;