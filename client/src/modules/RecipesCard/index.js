import React from 'react'
import { useEffect } from "react";
import { BASE_URL, ALL_RECIPES } from "../../constants"
import { connect } from 'react-redux';
import { getRecipes } from '../../store/actions/RecipesActions';

function RecipesCard({recipes, getRecipes}) {
    function getRecipesFunction(){
        getRecipes()
    } 
    useEffect(() => {
        getRecipesFunction()
    }, [])
    return (
        <div>
            <h1>Henry Food</h1>
            {recipes.map((recipe) => {
                return <div key={recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt="Foto de la receta"></img>
                    <p>Tipos de dieta: {recipe.diets}</p>
                </div>
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: recipes => {
            dispatch(getRecipes(recipes))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesCard)
