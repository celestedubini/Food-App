import { GET_RECIPES } from "../actions/RecipesActions";

const INITIAL_STATE = {
    recipes: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state, recipes: action.payload,
            };
            default:
                return {...state};
    }
}

export default reducer;