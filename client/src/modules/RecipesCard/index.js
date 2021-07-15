import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, ALL_RECIPES } from "../../constants"

function RecipesCard() {
    const [recipes, setRecipes] = useState([]);
    function getRecipes() {
        return axios.get("http://localhost:3001/recipes")
            .then(recipes => setRecipes(recipes.data))
    }
    useEffect(() => {
        getRecipes()
    }, [])
    return (
        <div>
            {recipes.map((recipe) => {
                return <div>
                    <p>{recipe.title}</p>
                    <img src={recipe.image}></img>
                    <p>Tipos de dieta: {recipe.diets}</p>
                </div>
            })}
        </div>
    )
}

export default RecipesCard
