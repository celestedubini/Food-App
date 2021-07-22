import React from 'react'
import { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { getDetail } from '../../store/actions/RecipesActions';
import "./index.css"
import { NavLink } from 'react-router-dom';

function RecipeDetail(props) {
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[])

        return (
            <div>
                {props.recipeId.length !== 0 ?
                    <div className="detail">
                        <div>
                            <h2 className="nombre">
                                {props.recipeId.title}
                            </h2>
                        </div>
                        <img src={props.recipeId.image} alt={"img"} className="fotito"/>
                        <div className="texto">
                            <p>Types of Diet: {typeof props.recipeId.diets[0] === "object" ? 
                            props.recipeId.diets.map(diet => Object.values(diet)).join(", ") : props.recipeId.diets.map(diet => diet).join(", ")}</p>
                            <p>Summary: </p><div dangerouslySetInnerHTML={{ __html: props.recipeId.summary }}></div>
                            <p>Score: {props.recipeId.spoonacularScore}</p>
                            <p>Health Score: {props.recipeId.healthScore}</p>
                            <p>Steps: </p><div dangerouslySetInnerHTML={{ __html: props.recipeId.instructions? props.recipeId.instructions : "Not available"}}></div>
                        </div>
                    </div>
                    : <h1 className="Loading">Loading ...</h1>
                }
                 <NavLink to='/home'>
                    <button className="botonBackDetail">Back</button>
                </NavLink>
            </div>
        );
    }


function mapStateToProps(state) {
    return {
        recipeId: state.recipeDetail
    }
}

export default connect(mapStateToProps, { getDetail })(RecipeDetail);
