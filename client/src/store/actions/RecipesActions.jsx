import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";

export function getRecipes() {
    return function (dispatch) {
        return axios.get("http://localhost:3001/recipes").then((response) => {
            dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        })
    }
}