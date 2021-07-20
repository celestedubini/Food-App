import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_TYPES = "GET_TYPES";
export const ASC = 'ASC';
export const DESC = 'DESC';
export const MINMAX = "MINMAX";
export const MAXMIN = "MAXMIN";
export const FILTER_BY_DIET ="FILTER_BY_DIET"

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

export function getByName(title) {
    return function (dispatch) {
        return axios.get("http://localhost:3001/recipes?name=" + title).then((response) => {
            dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: response.data
            })
        })
    }
}

export function getDetail(id) {
    return function (dispatch) {
        return axios.get("http://localhost:3001/recipes/" + id).then((response) => {
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data
            })
        })
    }
}

export function getTypes() {
    return function (dispatch) {
        return axios.get("http://localhost:3001/types").then((response) => {
            dispatch({
                type: GET_TYPES,
                payload: response.data
            })
        })
    }
}

export function getOrder(value) {
    if (value === ASC) {
        return {
            type: ASC,
        };
    } else {
        return {
            type: DESC,
        };
    }
}

export function getOrderByScore(value) {
    if (value === MINMAX) {
        return {
            type: MINMAX,
        };
    } else {
        return {
            type: MAXMIN,
        };
    }
}

export function filterByDiet(diets) {
    return {
        type: FILTER_BY_DIET,
        payload: diets
    }
}